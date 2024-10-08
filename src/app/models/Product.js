// src/models/Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize'; // Adjust the path as necessary

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
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1 // หรือกำหนดค่าเริ่มต้นที่เหมาะสม
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      // Prepend base URL to imageUrl
      const imageUrl = this.getDataValue('imageUrl');
      return imageUrl ? `${process.env.BASE_URL}/images/${imageUrl}` : null;
    }
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
