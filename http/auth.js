export const logFetch = async (credentials) =>
  await fetch('http://localhost:3000/api/user/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }).then((res) => res.json())

export const registrationFetch = async (formData) =>
  await fetch('http://localhost:3000/api/user/registration', {
    method: 'POST',
    body: formData
  }).then((res) => res.json())

export const checkAuthToken = async (token) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/user/auth_check',
      {
        method: 'POST',
        body: JSON.stringify({
          token
        })
      }
    )
    return await res.json()
  } catch (e) {
    console.log(e)
  }
}
