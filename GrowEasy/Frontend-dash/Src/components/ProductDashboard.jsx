import React, { useEffect, useState } from 'react'
import { apiService } from '../services/api'

const ProductDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiService.fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-gray-500 text-center mt-10">Loading products...</p>
  }

  if (error) {
    return <p className="text-red-600 text-center mt-10">Error loading products: {error.message}</p>
  }

  return (
    <div className="overflow-x-auto border shadow rounded-lg bg-white">
      <h2 className="text-2xl font-semibold p-4 border-b">📦 Product List</h2>
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Vendor</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{p.title}</td>
              <td className="p-3">{p.vendor}</td>
              <td className="p-3">₹{p.price}</td>
              <td className="p-3">{p.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductDashboard
