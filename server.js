//express requisição
const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require("./data")

const server = express()

//usar arquivos estaticos
server.use(express.static('public'))

//config template engine
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true
})

//rotas
server.get("/", function(req, res){
    return res.render("index")
})

server.get("/about", function(req, res){
    return res.render("about")
})

server.get("/recipes", function(req, res){
    return res.render("recipes", {items: recipes})
})

server.get("/recipe/:index", function (req, res) {
    const recipe = recipes ;
    const recipeIndex = req.params.index;
    return res.render("recipe", {items: recipe[recipeIndex]})

  })

//iniciar o servidor
server.listen(5000, function(){
    console.log("server is running")
})