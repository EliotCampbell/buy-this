import { NextResponse } from 'next/server'
import { User } from '@/models/models'
import { headers } from 'next/headers'
import { getFormData } from '@/utils'

export const PATCH = async (request) => {
  try {
    const formData = await getFormData(request)
    console.log(formData)
    const headersList = headers()
    const userId = headersList.get('userId')
    const oldUser = await User.findOne({
      where: { id: userId }
    })
    if (!oldUser)
      return NextResponse.json({
        ok: false,
        message: "Can't find user",
        dataObject: { userId }
      })
    const user = await User.update(formData, { where: { id: userId } })
    return NextResponse.json({
      ok: true,
      message: 'Users updated successfully',
      dataObject: { user }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}
