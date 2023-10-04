export const fetchAllOrders = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/admin_routes/order'
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
