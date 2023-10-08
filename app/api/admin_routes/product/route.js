import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { Product, Specification, Category, Brand } from '@/models/models'
const uuid = require('uuid')

export const POST = async (request) => {
  try {
    const formData = await request.formData()
    const name = formData.get('name')
    const price = formData.get('price')
    const brandId = formData.get('brandId')
    const categoryId = formData.get('categoryId')
    const description = formData.get('description')
    const info = formData.get('info')
    const highlight = formData.get('highlight')
    const hotDeal = formData.get('hotDeal')
    const img = formData.get('img')
    const onSale = formData.get('onSale')
    const discountPrice = formData.get('salePrice')
    const inStock = formData.get('inStock')

    if (!name || !price || !brandId || !categoryId || !description || !img) {
      return NextResponse.json({
        ok: false,
        message: 'Not all fields provided',
        dataObject: {
          name,
          price,
          brandId,
          categoryId,
          description,
          img
        }
      })
    }
    const foundProduct = await Product.findOne({
      where: { name: name }
    })
    const foundBrand = await Brand.findByPk(brandId)
    const foundCategory = await Category.findByPk(categoryId)
    if (foundProduct !== null) {
      return NextResponse.json({
        ok: false,
        message: `Product with name "${name}" is already exists`,
        dataObject: {
          newDevice: { name, price, brandId, categoryId, description }
        }
      })
    }
    if (foundCategory === null) {
      return NextResponse.json({
        ok: false,
        message: 'This category not found',
        dataObject: {
          newDevice: { name, price, brandId, categoryId, description }
        }
      })
    }
    if (foundBrand === null) {
      return NextResponse.json({
        ok: false,
        message: 'This brand not found',
        dataObject: {
          newDevice: { name, price, brandId, categoryId, description }
        }
      })
    }

    let fileName = 'noImg.jpg'
    if (img.size > 0) {
      fileName = uuid.v4() + '.jpg'
      await writeFile(
        `public/static/${fileName}`,
        Buffer.from(await img.arrayBuffer())
      )
    }

    const newDevice = await Product.create({
      name,
      price,
      brandId,
      categoryId,
      description,
      img: fileName,
      onSale,
      discountPrice,
      highlight,
      hotDeal,
      inStock
    })

    if (info) {
      JSON.parse(info).forEach((i) => {
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
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
