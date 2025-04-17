'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const userEmail = Cookies.get('userEmail');

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem("orders")) || {};
    if (userEmail && allOrders[userEmail]) {
      setOrders(allOrders[userEmail]);
    }
  }, [userEmail]);

  return (
    <div className="container mt-5">
      <h1>Welcome to your dashboard 🎉</h1>

      <h3 className="mt-4">🧾 Your Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.paymentMethod.toUpperCase()}</td>
                <td>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.title} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
