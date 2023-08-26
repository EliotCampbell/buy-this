import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
const uuid = require('uuid')
import { writeFile } from 'fs/promises'

const {
  Product,
  ProductsInfo,
  Category,
  ProductInfo,
  Brand
} = require('@/models/models')

export const GET = async (request, { params }) => {
  try {
    const id = params.id
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }]
    })
    if (product === null) {
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: { id }
      })
    }
    return NextResponse.json({
      ok: true,
      message: 'Product found successfully',
      dataObject: { product }
    })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}

export const PUT = async (request, { params }) => {
  try {
    const id = params.id
    const formData = await request.formData()
    let name = formData.get('name')
    let price = formData.get('price')
    let brandId = formData.get('brandId')
    let categoryId = formData.get('categoryId')
    let description = formData.get('description')
    let info = formData.get('info')
    const img = formData.get('img') || 'noImg.jpg'
    const oldProduct = await Product.findByPk(id)
    const foundBrand = await Brand.findByPk(brandId)
    const foundCategory = await Category.findByPk(categoryId)
    if (!oldProduct) {
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: { id }
      })
    }
    if (!foundCategory) {
      return NextResponse.json({
        ok: false,
        message: 'This category not found',
        dataObject: {
          newDevice: { name, price, brandId, categoryId, description }
        }
      })
    }
    if (!foundBrand) {
      return NextResponse.json({
        ok: false,
        message: 'This brand not found',
        dataObject: {
          newDevice: { name, price, brandId, categoryId, description }
        }
      })
    }

    if (oldProduct.img !== 'noImg.jpg') {
      await fs.unlink(`public/static/` + oldProduct.img, (err) => {
        err && console.log(err)
      })
    }

    let fileName = 'noImg.jpg'
    if (img !== 'noImg.jpg' || img !== undefined || true) {
      fileName = uuid.v4() + '.jpg'
      await writeFile(
        `public/static/${fileName}`,
        Buffer.from(await img.arrayBuffer())
      )
    }

    const data = await Product.update(
      {
        name,
        price,
        brandId,
        categoryId,
        description,
        img: fileName
      },
      { where: { id: id } }
    )
    const newProduct = await Product.findByPk(id)
    if (data[0] === 1) {
      return NextResponse.json({
        ok: true,
        message: 'Product successfully updated',
        dataObject: { oldProduct, newProduct }
      })
    }
    if (data[0] === 0) {
      return NextResponse.json({
        ok: false,
        message: "Can't update category or category already updated",
        dataObject: { oldProduct }
      })
    }
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    const id = params.id
    const product = await Product.findByPk(id)
    if (!product) {
      return NextResponse.json({
        ok: false,
        message: 'Product not found',
        dataObject: { id }
      })
    }
    const dataProduct = await Product.destroy({ where: { id: id } })
    await ProductInfo.destroy({ where: { productId: null } })

    if (product.img !== 'noImg.jpg') {
      await fs.unlink(`public/static/` + product.img, (err) => {
        err && console.log(err)
      })

      if (dataProduct === 1) {
        return NextResponse.json({
          ok: true,
          message: 'Product successfully deleted',
          dataObject: { product }
        })
      }
      if (dataProduct === 0) {
        return NextResponse.json({
          ok: false,
          message: "Can't delete product",
          dataObject: { product }
        })
      }
    }
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
