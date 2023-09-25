import { NextResponse } from 'next/server'
import fs from 'fs'
const uuid = require('uuid')
import { writeFile } from 'fs/promises'

const { Product, Category, Specification, Brand } = require('@/models/models')

export const PUT = async (request, { params }) => {
  try {
    const id = params.id
    const formData = await request.formData()
    const name = formData.get('name')
    const price = formData.get('price')
    const brandId = formData.get('brandId')
    const categoryId = formData.get('categoryId')
    const description = formData.get('description')
    //const info = formData.get('info')
    const highlight = formData.get('highlight')
    const hotDeal = formData.get('hotDeal')
    const img = formData.get('img')
    const onSale = formData.get('onSale')
    const discountPrice = formData.get('sellPrice')
    const inStock = formData.get('inStock')
    if (
      !id ||
      !name ||
      !price ||
      !brandId ||
      !categoryId ||
      !description ||
      !img
    ) {
      return NextResponse.json({
        ok: false,
        message: 'Not all fields provided',
        dataObject: {
          id,
          name,
          price,
          brandId,
          categoryId,
          description,
          img
        }
      })
    }
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
    if (oldProduct.img !== 'noImg.jpg' && oldProduct.img !== img) {
      await fs.unlink(`public/static/` + oldProduct.img, (err) => {
        err && console.log(err)
      })
    }

    let fileName = 'noImg.jpg'

    if (oldProduct.img === img) {
      fileName = oldProduct.img
    }

    if (oldProduct.img !== img && img.size > 0) {
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
        img: fileName,
        highlight,
        hotDeal,
        onSale,
        discountPrice,
        inStock
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
    await Specification.destroy({ where: { productId: id } })

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
