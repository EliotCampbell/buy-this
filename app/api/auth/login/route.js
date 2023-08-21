import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { User } from '@/models/models'
import bcrypt from 'bcrypt'

const generateJwt = (id, email, role = 'USER') =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '12h' })

export const POST = async (request) => {
  try {
    const { email, password } = await request.json()
    const user = await User.findOne({ where: { email } })
    if (!user)
      return NextResponse.json({
        ok: false,
        message: 'User not found',
        dataObject: { email }
      })
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return NextResponse.json({
        ok: false,
        message: 'Wrong password',
        dataObject: { email }
      })
    }
    const token = generateJwt(user.id, user.email, user.role)
    return NextResponse.json(
      {
        ok: true,
        message: 'Token updated successfully',
        dataObject: { token, id: user.id, email: user.email, role: user.role }
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': [
            `userId=${user.id};Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `userEmail=${user.email};Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `userRole=${user.role};Path=/;Max-Age=${'86400'};HttpOnly;Secure`,
            `token=${token};Path=/;Max-Age=${'86400'};Secure`
          ]
        }
      }
    )
  } catch (e) {
    console.log('Internal error in login api ' + e.message)
  }
}
