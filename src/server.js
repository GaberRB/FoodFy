//express requisição
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require('method-override')


const server = express()


server.use(methodOverride('_method'))
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(routes)

//config template engine
server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    autoescape:false,
    noCache: true
})

//iniciar o servidor
server.listen(5000, function(){
    console.log("server is running")
})