const express = require('express')
const routes = express.Router()
const foodfy = require('./controllers/foodfy')
const recipes = require('./controllers/recipes')

//rotas do foodfy
routes.get("/", foodfy.index)
routes.get("/about", foodfy.about)
routes.get("/recipes", foodfy.recipes)
routes.get("/recipe/:index", foodfy.recipe)


  //rotas do admin
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