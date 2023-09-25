export const logFetch = async (credentials) =>
  await fetch('http://localhost:3000/api/public_routes/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }).then((res) => res.json())

export const registrationFetch = async (formData) =>
  await fetch('http://localhost:3000/api/public_routes/registration', {
    method: 'POST',
    body: formData
  }).then((res) => res.json())

export const checkAuthToken = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/auth_check',
      {
        method: 'POST'
      }
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}

export const logout = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user-routes/logout'
    ).then((r) => r.json())
  } catch (e) {
    console.log(e)
  }
}
