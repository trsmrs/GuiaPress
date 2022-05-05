const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const connection = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')



// view engine
app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// DataBase
connection.authenticate().then(() => {
   console.log('Conexão efetuada com sucesso!')
}).catch((error) => {
    console.log(error)
})

// app.get('/')
app.use('/', categoriesController)
app.use('/', articlesController)


app.get('/', (re, res)=>{
    Article.findAll({order:[['id', 'DESC']]}).then(articles =>{
        Category.findAll().then(categories =>{
            res.render('index', {articles: articles, categories: categories})
        })
    })
})


app.get('/:slug', (req, res)=>{
    let slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render('article', {article: article, categories: categories})
            })
        }else{
            res.redirect('/')
        }
    }).catch(err =>{
        res.redirect('/')
    })
})


app.get('/category/:slug',(req, res)=>{
    let slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category =>{
        if(category != undefined){
                Category.findAll().then(categories =>{
                    res.render('index', {articles: category.articles, categories: categories})
                })
        }else{
            res.redirect('/')
        }
    }).catch(err =>{
        res.redirect('/')
    })
})

// conexão com o Servidor
const port = process.env.PORT || 8080
app.listen(port,()=>{console.log(`Server is Listening on port ${port}`)})
