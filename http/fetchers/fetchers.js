export const fetchAllCategories = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/public_routes/category'
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const fetchAllBrands = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/public_routes/brand'
    ).then((data) => data.json())
  } catch (error) {
    console.log(error)
  }
}

export const fetchAllProducts = async (query) => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/public_routes/product?' +
        (query && new URLSearchParams(query))
    ).then((data) => data.json())
  } catch (error) {
    console.log(error)
  }
}

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/public_routes/product/' +
        id
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const fetchAllShippingCosts = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/public_routes/shipping_cost/'
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
