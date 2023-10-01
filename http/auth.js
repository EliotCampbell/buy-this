export const logFetch = async (credentials) => {
  try {
    return await fetch('http://localhost:3000/api/public_routes/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const registrationFetch = async (formData) => {
  try {
    return await fetch('http://localhost:3000/api/public_routes/registration', {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const checkAuthToken = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/auth_check',
      {
        method: 'POST'
      }
    ).then((res) => res.json())
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  try {
    return await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user_routes/logout'
    ).then((r) => r.json())
  } catch (error) {
    console.log(error)
  }
}
