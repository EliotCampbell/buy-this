export const getMyOrders = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/order/'
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}
