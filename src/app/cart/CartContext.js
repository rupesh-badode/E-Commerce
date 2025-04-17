"use client";
import { createContext, useState, useEffect, useContext, use } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const[orderHistory,setOrderHistory] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  

  useEffect(()=>{

  },[]); 

  useEffect(() => {
    const userEmail = Cookies.get("userEmail");
    if (userEmail) {
      const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
      if (allOrders[userEmail]) {
        setOrderHistory(allOrders[userEmail]);
      }
    }
  }, []);
  

  const placeOrder = (order) => {
    setOrderHistory((prev) => {
      const updated = [...prev, order];
  
      // ✅ Save to localStorage based on user email
      const userEmail = Cookies.get("userEmail");
      if (userEmail) {
        const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
        allOrders[userEmail] = updated;
        localStorage.setItem("orders", JSON.stringify(allOrders));
      }
  
      return updated;
    });
  };
  
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

 
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove if quantity drops to 0
    );
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartCount,removeFromCart,updateQuantity,orderHistory,placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
