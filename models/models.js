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

const CategoryBrand = sequelize.define('category_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

/*const OrderProduct = sequelize.define('order_user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})*/

const Cart = sequelize.define('cart', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const CartProduct = sequelize.define('cart_product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

User.hasMany(Rating)
Rating.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(ProductInfo)
ProductInfo.belongsTo(Product)

Product.hasMany(Order)
Order.belongsTo(Product)

Category.belongsToMany(Brand, { through: CategoryBrand })
Brand.belongsToMany(Category, { through: CategoryBrand })

module.exports = {
  User,
  Product,
  Category,
  Brand,
  Rating,
  CategoryBrand,
  ProductInfo,
  Order
}

/*sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Database models synchronized.')
  })
  .catch((err) => {
    console.error('Error synchronizing database models:', err)
  })*/
