const Sequelize = require('sequelize')


const connection = new Sequelize('guiapress', 'root', '209065',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})


module.exports = connection