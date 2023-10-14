import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { User } from '@/models/models'
import { getFormData } from '@/utils'
import bcrypt from 'bcrypt'

export const PATCH = async (request) => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const formData = await getFormData(request)
    const user = await User.findByPk(userId)
    if (!user)
      return NextResponse.json({
        ok: false,
        message: 'User not found',
        dataObject: { userId }
      })
    const comparePassword = bcrypt.compareSync(
      formData.oldPassword,
      user.password
    )
    if (!comparePassword) {
      return NextResponse.json({
        ok: false,
        message: 'Wrong password',
        dataObject: {}
      })
    }
    if (formData.newPassword.length < 8)
      return NextResponse.json({
        ok: false,
        message: 'Password shorter than 8 characters',
        dataObject: {}
      })
    if (formData.newPassword !== formData.repeatNewPassword) {
      return NextResponse.json({
        ok: false,
        message: 'Passwords do not match',
        dataObject: {}
      })
    }
    const comparePasswords = bcrypt.compareSync(
      formData.newPassword,
      user.password
    )
    if (comparePasswords) {
      return NextResponse.json({
        ok: false,
        message: 'Passwords must  be different',
        dataObject: {}
      })
    }
    const hashPassword = await bcrypt.hash(formData.newPassword, 5)
    const updatedUser = await User.update(
      {
        password: hashPassword
      },
      { where: { id: userId } }
    )
    if (updatedUser[0] === 1)
      return NextResponse.json({
        ok: true,
        message: 'Password updated successfully',
        dataObject: {}
      })
    if (updatedUser[0] === 0)
      return NextResponse.json({
        ok: false,
        message: "Can't update password",
        dataObject: {}
      })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
