export const getCart = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/cart/'
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const addProductToCart = async (productId, quantity, price) => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/cart/',
      {
        method: 'POST',
        body: JSON.stringify({ productId, quantity, price })
      }
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const changeProductQuantity = async (productInCartId, quantity) => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/user_routes/cart/' +
        productInCartId,
      {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export const removeProductFromCart = async (productInCartId) => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/user_routes/cart/' +
        productInCartId,
      {
        method: 'DELETE'
      }
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const removeAllProductsFromCart = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/cart/',
      {
        method: 'DELETE'
      }
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}
