//express requisição
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')


const server = express()

//usar arquivos estaticos
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(routes)

//config template engine
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true
})

//iniciar o servidor
server.listen(5000, function(){
    console.log("server is running")
})