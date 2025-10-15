import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0, stock: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then(res => setProducts(res.data));
  }, []);

  const addProduct = async () => {
    const res = await axios.post("http://localhost:5000/api/products", newProduct);
    setProducts([...products, res.data]);
    setNewProduct({ name: "", price: 0, stock: 0 });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <label htmlFor="">Name:</label>
        <input className="border px-2 py-1 mr-2" placeholder="Name" value={newProduct.name}
               onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
        <label>Price:</label>       
        <input className="border px-2 py-1 mr-2" placeholder="Price" type="number" value={newProduct.price}
               onChange={e => setNewProduct({ ...newProduct, price: +e.target.value })} />
        <label>Stock:</label>       
        <input className="border px-2 py-1 mr-2" placeholder="Enter the stock" type="number" value={newProduct.stock}
               onChange={e => setNewProduct({ ...newProduct, stock: +e.target.value })} />
        <button onClick={addProduct} className="bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border rounded p-4 bg-white shadow-sm">
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Stock: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


