import React,{ useEffect, useState } from "react";

import axios from "axios";

interface Order {
  _id: string;
  productId: { name: string };
  quantity: number;
  date: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {orders.map((o) => (
        <div key={o._id} className="border p-3 mb-3 rounded bg-white shadow-sm">
          <p>Product: {o.productId?.name}</p>
          <p>Quantity: {o.quantity}</p>
          <p>Date: {o.date}</p>
        </div>
      ))}
    </div>
  );
}



