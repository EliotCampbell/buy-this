export const fetchCart = async () =>
  await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/cart/'
  ).then((res) => res.json())

export const addProductToCart = async (productId, quantity, price) =>
  await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/cart/',
    {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, price })
    }
  ).then((res) => res.json())

export const removeProductFromCart = async (productInCartId) =>
  await fetch(
    process.env.NEXT_PUBLIC_REACT_APP_API_URL +
      'api/user_routes/cart/' +
      productInCartId,
    {
      method: 'DELETE'
    }
  ).then((res) => res.json())
