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
