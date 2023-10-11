const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'USER', allowNull: false },
  address: { type: DataTypes.STRING },
  postalCode: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  phoneNumber: { type: DataTypes.STRING }
})

const Product = sequelize.define('product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  itemCode: { type: DataTypes.STRING, unique: true, allowNull: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  discountPrice: { type: DataTypes.FLOAT },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.TEXT, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  highlight: { type: DataTypes.BOOLEAN, defaultValue: false },
  hotDeal: { type: DataTypes.BOOLEAN, defaultValue: false },
  onSale: { type: DataTypes.BOOLEAN, defaultValue: false },
  inStock: { type: DataTypes.INTEGER, defaultValue: 0 },
  hidden: { type: DataTypes.BOOLEAN, defaultValue: false }
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

const Specification = sequelize.define('specification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }
})

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  postalCode: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  orderStatus: {
    type: DataTypes.STRING,
    defaultValue: 'new',
    allowNull: false
  },
  productsQuantity: { type: DataTypes.INTEGER, allowNull: false }
})

const OrderProduct = sequelize.define('order_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false }
})

const CartProduct = sequelize.define('cart_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false }
})

const ShippingCost = sequelize.define('shipping_costs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  country: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING },
  area: { type: DataTypes.STRING },
  shippingCost: { type: DataTypes.FLOAT, allowNull: false }
})

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(CartProduct)
CartProduct.belongsTo(User)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(Specification, { as: 'info' })
Specification.belongsTo(Product)

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
  Specification,
  Order,
  CartProduct,
  OrderProduct,
  ShippingCost
}

/*sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database models synchronized.')
  })
  .catch((err) => {
    console.error('Error synchronizing database models:', err)
  })*/
