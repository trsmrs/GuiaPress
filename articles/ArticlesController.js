const express = require('express')
const router = express.Router()



router.get('/articles', (req, res) => {
    res.send('Rota de Artigos')
})


router.get('/admin/categories/new',(req, res) => {
  res.send('Rota para Criar novo Artigo')
})

module.exports = router