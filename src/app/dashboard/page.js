'use client';
import { useCart } from '../cart/CartContext';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const{orderHistory} = useCart();
  const userEmail = Cookies.get('userEmail');

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    if (userEmail && allOrders[userEmail]) {
      setOrders(allOrders[userEmail]);
    }
  }, [userEmail]);

  return (
    <div className="container mt-4">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        orderHistory.map(order => (
          <div key={order.id} className="card mb-3 p-3">
            <h5>Order #{order.id}</h5>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Payment:</strong> {order.paymentMethod.toUpperCase()}</p>
            <p><strong>Shipping To:</strong> {order.shippingInfo.name}, {order.shippingInfo.address}, {order.shippingInfo.city} - {order.shippingInfo.pincode}</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.title} x {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

