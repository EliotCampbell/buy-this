export const fetchAllCategories = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/category'
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const fetchAllBrands = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/brand'
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
        'api/product?' +
        (query && new URLSearchParams(query))
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
export const fetchProductById = async (id) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/product/' + id
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
