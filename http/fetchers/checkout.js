export const checkout = async (formData) => {
  try {
    return await fetch('http://localhost:3000/api/user_routes/checkout', {
      method: 'POST',
      body: JSON.stringify(formData)
    }).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}
