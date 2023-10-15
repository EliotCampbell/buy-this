import { jwtVerify, SignJWT } from 'jose'

const secret = new TextEncoder().encode(process.env.SECRET_KEY)

export const generateJwt = async (id, email, role = 'USER', username) => {
  return await new SignJWT({ id, email, role, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('12h')
    .sign(secret)
    .then((data) => data)
}

export const verifyJwt = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.log('utils.verify failed:' + error.message)
    return null
  }
}

export const getFormData = async (request) => {
  const objectData = {}
  await request.formData().then((data) => {
    for (const [key, value] of data.entries()) {
      objectData[key] = value
    }
  })
  return objectData
}
export const getURLParams = (request) => {
  const searchParamsObject = {}
  const nextSearchParams = new URLSearchParams(request.nextUrl.search)
  for (const [key, value] of nextSearchParams.entries()) {
    searchParamsObject[key] = value
  }
  return searchParamsObject
}
