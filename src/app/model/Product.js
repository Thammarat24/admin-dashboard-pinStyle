// src/models/Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize'; // ปรับเส้นทางตามความเหมาะสม

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories',
      key: 'id'
    },
    allowNull: false
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'products'
});

export default Product;
