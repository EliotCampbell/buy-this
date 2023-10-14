import { NextResponse } from 'next/server'
import fs from 'fs'
const uuid = require('uuid')
import { writeFile } from 'fs/promises'
import { getFormData } from '@/utils'
const { Product, Category, Specification, Brand } = require('@/models/models')

export const PATCH = async (request, { params }) => {
  try {
    const id = params.id
    const formData = await getFormData(request)
    const oldProduct = await Product.findByPk(id)
    const foundBrand = await Brand.findByPk(formData.brandId)
    const foundCategory = await Category.findByPk(formData.categoryId)
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
          newDevice: formData
        }
      })
    }
    if (!foundBrand) {
      return NextResponse.json({
        ok: false,
        message: 'This brand not found',
        dataObject: {
          newDevice: formData
        }
      })
    }
    let fileName = oldProduct.img
    if (
      (formData.img.size > 0 && oldProduct.img !== 'noImg.jpg') ||
      (formData.removeImg && oldProduct.img !== 'noImg.jpg')
    ) {
      await fs.unlink(`public/static/` + oldProduct.img, (err) => {
        err && console.log(err)
      })
    }

    if (formData.img.size > 0) {
      fileName = uuid.v4() + '.jpg'
      await writeFile(
        `public/static/${fileName}`,
        Buffer.from(await formData.img.arrayBuffer())
      )
    }
    const data = await Product.update(
      { ...formData, img: fileName },
      { where: { id } }
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
    await Specification.destroy({ where: { productId: id } })

    if (product.img !== 'noImg.jpg') {
      await fs.unlink(`public/static/` + product.img, (err) => {
        err && console.log(err)
      })
    }

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
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: e.message }
    })
  }
}
