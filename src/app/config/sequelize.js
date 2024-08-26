// src/app/config/sequelize.js
import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2'; // Import mysql2
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false,
});

export default sequelize;
