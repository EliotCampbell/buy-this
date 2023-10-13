export const patchPersonalData = async (formData) => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL +
        'api/user_routes/personal_data/',
      { method: 'PATCH', body: formData }
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}
