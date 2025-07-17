const API_BASE_URL = 'https://e2aj63lckk.execute-api.ap-south-1.amazonaws.com/default' // ✅ your actual endpoint

export const apiService = {
  async fetchProducts() {
    const response = await fetch(`${API_BASE_URL}/products`)
    if (!response.ok) throw new Error('Failed to load products')
    return response.json()
  }
}
