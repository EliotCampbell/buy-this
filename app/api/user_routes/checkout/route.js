import { headers } from 'next/headers'
import { CartProduct, Order, OrderProduct, Product } from '@/models/models'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  try {
    const headersList = headers()
    const userId = headersList.get('userId')
    const data = await request.json()
    const cart = await CartProduct.findAll({
      include: { model: Product, as: 'product' },
      where: { userId }
    }).then((data) =>
      data.map((cartProduct) => cartProduct.get({ plain: true }))
    )
    const sum = Number.parseFloat(
      cart.reduce(
        (acc, el) =>
          el.product.onSale
            ? el.product.discountPrice * el.quantity + acc
            : el.product.price * el.quantity + acc,
        0
      )
    ).toFixed(2)
    const order = await Order.create({
      userId: userId,
      email: data.email,
      phoneNumber: data.phoneNumber,
      title: data.title,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      amount: sum
    })
    const orderProduct = await OrderProduct.bulkCreate(
      cart.map((cartProduct) => ({
        quantity: cartProduct.quantity,
        price: cartProduct.product.discountPrice || cartProduct.product.price,
        productId: cartProduct.productId,
        orderId: order.id
      }))
    )
    return NextResponse.json({
      ok: true,
      message: 'Order created successfully',
      dataObject: { order, orderProduct }
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      ok: false,
      message: 'Error',
      dataObject: { error: error.message }
    })
  }
}

/*
Promise.all(itemsToUpdate.map(async (item) => {
  try {
    const { id, count, price } = item;
    const updatedItem = await Item.findByPk(id);

    if (updatedItem) {
      // Update the fields individually
      updatedItem.count = count;
      updatedItem.price = price;

      await updatedItem.save();
      console.log(`Item with ID ${id} updated successfully.`);
    } else {
      console.log(`Item with ID ${id} not found.`);
    }
  } catch (error) {
    console.error(`Error updating item with ID ${item.id}:`, error);
  }
}))*/
