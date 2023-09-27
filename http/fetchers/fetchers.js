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
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/public_routes/brand'
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const fetchAllProducts = async (query) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/public_routes/product?' +
        (query && new URLSearchParams(query))
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const fetchAllUsers = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/admin_routes/user?'
    )
    return await res.json()
  } catch (e) {
    console.log(e)
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
