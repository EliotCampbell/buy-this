import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { Product, Specification, Category, Brand } from '@/models/models'
import { getFormData } from '@/utils'
const uuid = require('uuid')

export const POST = async (request) => {
  try {
    const formData = await getFormData(request)
    console.log(!formData.name)
    if (
      !formData.name ||
      !formData.price ||
      !formData.brandId ||
      !formData.categoryId ||
      !formData.description ||
      !formData.img
    )
      return NextResponse.json({
        ok: false,
        message: 'Not all fields provided',
        dataObject: { ...formData }
      })
    const foundProduct = await Product.findOne({
      where: { name: formData.name }
    })
    const foundBrand = await Brand.findByPk(formData.brandId)
    const foundCategory = await Category.findByPk(formData.categoryId)
    if (foundProduct !== null) {
      return NextResponse.json({
        ok: false,
        message: `Product with name "${formData.name}" is already exists`,
        dataObject: {
          newProduct: { ...formData },
          foundProduct
        }
      })
    }
    if (foundCategory === null) {
      return NextResponse.json({
        ok: false,
        message: 'This category not found',
        dataObject: {
          newDevice: { ...formData }
        }
      })
    }
    if (foundBrand === null) {
      return NextResponse.json({
        ok: false,
        message: 'This brand not found',
        dataObject: {
          newDevice: { ...formData }
        }
      })
    }

    let fileName = 'noImg.jpg'
    if (formData.img.size > 0) {
      fileName = uuid.v4() + '.jpg'
      await writeFile(
        `public/static/${fileName}`,
        Buffer.from(await formData.img.arrayBuffer())
      )
    }

    const newDevice = await Product.create({
      ...formData,
      img: fileName
    })

    if (formData.info) {
      JSON.parse(formData.info).forEach((i) => {
        Specification.create({
          title: i.title,
          description: i.description,
          deviceId: newDevice.id
        })
      })
    }

    return NextResponse.json({
      ok: true,
      message: 'Product created successfully',
      dataObject: { newDevice }
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}
