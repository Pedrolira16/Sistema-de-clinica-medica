const env = require('dotenv');

env.config();

module.exports = {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME,
    secretKey: process.env.SECRET_KEY,
    define : {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        "createdAt": "created_at",
        "updatedAt": "updated_at",
    },
    dialectOptions : {
        timezone: 'America/Sao_Paulo',
    },
    timezone: 'America/Sao_Paulo',    
};  