// src/components/ProductTable.jsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../api";

export default function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Inventory Overview</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Product ID</th>
            <th className="p-2">Timestamp</th>
            <th className="p-2">Total Inventory</th>
            <th className="p-2">Latest Price</th>
            <th className="p-2">Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-50 transition text-gray-700"
            >
              <td className="p-2">{p.product_id}</td>
              <td className="p-2">{p.timestamp}</td>
              <td className="p-2">{p.total_inventory}</td>
              <td className="p-2">{p.latest_price}</td>
              <td className="p-2">{p.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
