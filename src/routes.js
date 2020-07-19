const express = require('express')
const routes = express.Router()
const foodfy = require('./app/controllers/foodfy')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

//rotas do foodfy
routes.get("/", foodfy.index)
routes.get("/about", foodfy.about)
routes.get("/recipes", foodfy.recipes)
routes.get("/recipe/:index", foodfy.recipe)


  //rotas do admin chefs
routes.get('/admin', function(req, res){
    return res.redirect('/admin/chefs')
})
routes.get("/admin/chefs", chefs.index); // Mostrar a lista de receitas
routes.get("/admin/chefs/create", chefs.create); // Mostrar formulário de nova receita
routes.get("/admin/chefs/:id", chefs.show); // Exibir detalhes de uma receita
// routes.get("/admin/chefs/:id/edit", chefs.edit); // Mostrar formulário de edição de receita
routes.post("/admin/chefs", chefs.post); // Cadastrar nova receita
// routes.put("/admin/chefs", chefs.put); // Editar uma receita
// routes.delete("/admin/chefs", chefs.delete); // Deletar uma receita


  //rotas do admin receitas
routes.get('/admin', function(req, res){
    return res.redirect('/admin/recipes')
})
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

module.exports = routes