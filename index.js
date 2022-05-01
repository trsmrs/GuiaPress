const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const connection = require('./database/database')

const categoriesController = require('./categories/CategoriesController')
const articlesController = require('./articles/ArticlesController')

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


app.use('/prefixo', categoriesController)
app.use('/', articlesController)
// app.get('/', (req, res)=>{
//     res.render('index')
// })













// conexão com o Servidor
const port = process.env.PORT || 8080
app.listen(port,()=>{console.log(`Server is Listening on port ${port}`)})
