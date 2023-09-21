const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER', allowNull: false }
})

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discountPrice: { type: DataTypes.FLOAT },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.TEXT, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  highlight: { type: DataTypes.BOOLEAN, defaultValue: false },
  hotDeal: { type: DataTypes.BOOLEAN, defaultValue: false },
  onSale: { type: DataTypes.BOOLEAN, defaultValue: false },
  inStock: { type: DataTypes.INTEGER, defaultValue: 0 }
})

const Category = sequelize.define('category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false }
})

const ProductInfo = sequelize.define('product_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
})

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const OrderProduct = sequelize.define('order_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CartProduct = sequelize.define('cart_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

User.hasMany(Rating)
Rating.belongsTo(User)

module.exports = {
  User,
  Product,
  Category,
  Brand,
  Rating,
  ProductInfo,
  Order
}

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database models synchronized.')
  })
  .catch((err) => {
    console.error('Error synchronizing database models:', err)
  })
