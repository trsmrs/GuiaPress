const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // CRIANDO O RELACIONAMENTO DE 1 para MUITOS
Article.belongsTo(Category) // CRIANDO O RELACIONAMENTO 1-P-1 ENTRE ARTIGOS E CATEGORIAS 



module.exports = Article