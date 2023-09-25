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
    return undefined
  }
}
