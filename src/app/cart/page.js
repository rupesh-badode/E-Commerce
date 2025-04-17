"use client";

import { useCart } from "./CartContext";
import { useState } from "react";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity,placeOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const[step,setStep] = useState(1);
  
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});



  const validateForm = () => {
    let err = {};
    if (!shippingInfo.name) err.name = "Name is required";
    if (!shippingInfo.address) err.address = "Address is required";
    if (!shippingInfo.city) err.city = "City is required";
    if (!shippingInfo.pincode) err.pincode = "Pincode is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };



  const handleNext = () => {
    if (step === 2) {
      if (cartItems.length === 0) return alert("Your cart is empty!");
      setStep(3);
    } else if (step === 3) {
      if (validateForm()) {
        const order = {
          id: Date.now(), // or uuid
          items: cartItems,
          shippingInfo,
          paymentMethod,
          date: new Date().toLocaleString(),
        };
        placeOrder(order);
        setStep(4); // Proceed to the order confirmation step
      }
    }
  };
  

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    let method = "";
    if (paymentMethod === "cod") method = "Cash on Delivery";
    else if (paymentMethod === "card") method = "Card Payment";
    else if (paymentMethod === "upi") method = "UPI";

    alert(`You have selected ${method}. Proceeding to checkout...`);
  };

  return (
    <div className="container mt-4">
      <h1>Checkout</h1>
  
      {step === 1 && (
        <>
          <h4>Your Cart</h4>
          <table className="table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Quantity</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {cartItems.map((item) => (
      <tr key={item.id}>
        <td>{item.title}</td>
        <td>{item.quantity}</td>
        <td>
          <button
            className="btn btn-sm btn-danger me-2"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
          <button
            className="btn btn-sm btn-secondary me-1"
            onClick={() => updateQuantity(item.id, -1)}
          >
            -
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => updateQuantity(item.id, 1)}
          >
            +
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          <button className="btn btn-primary" onClick={() => setStep(2)}>
            Continue to Payment
          </button>
        </>
      )}
  
      {step === 2 && (
        <>
          <h4>Select Payment Method</h4>
          <select className="form-select w-50" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cod">Cash on Delivery</option>
            <option value="card">Card Payment</option>
            <option value="upi">UPI</option>
          </select>
          <button className="btn btn-primary mt-3" onClick={handleNext}>
            Continue to Shipping
          </button>
        </>
      )}
  
      {step === 3 && (
        <>
          <h4>Shipping Info</h4>
          <input placeholder="Name" className="form-control mb-2" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
          {errors.name && <div className="text-danger">{errors.name}</div>}
  
          <input placeholder="Address" className="form-control mb-2" value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
          {errors.address && <div className="text-danger">{errors.address}</div>}
  
          <input placeholder="City" className="form-control mb-2" value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} />
          {errors.city && <div className="text-danger">{errors.city}</div>}
  
          <input placeholder="Pincode" className="form-control mb-2" value={shippingInfo.pincode} onChange={(e) => setShippingInfo({ ...shippingInfo, pincode: e.target.value })} />
          {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
  
          <button className="btn btn-success mt-3" onClick={handleNext}>Place Order</button>
        </>
      )}
  
      {step === 4 && (
        <div className="text-center">
          <h2 className="text-success">🎉 Order Confirmed!</h2>
          <p>Thank you, <strong>{shippingInfo.name}</strong>! Your order will be shipped to:</p>
          <p>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.pincode}</p>
          <p>Payment Method: <strong>{paymentMethod.toUpperCase()}</strong></p>
          <button className="btn btn-outline-primary mt-3" onClick={() => setStep(1)}>Back to Cart</button>
        </div>
      )}
    </div>
  );
  
}
