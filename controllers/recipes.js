const fs = require('fs')
const data = require('../data.json')
const recipes = require("../data")
exports.index = function(req, res){
  const recipe = recipes ;
  return res.render('admin/recipes/index', {items: recipe})    
}
exports.create = function(req, res){
  return res.render('admin/recipes/create')
}
exports.show = function(req, res){
  const { id } = req.params
 // console.log(data.recipes.id)
  const foundRecipe = data.recipes.find(function(recipe){
    return recipe.id == id
  })

  if (!foundRecipe) return res.send('Receita não encontrada')

  const recipe = {
    ...foundRecipe
  }
  return res.render('admin/recipes/recipe', { items: recipe })
}
exports.edit = function(req, res){
return res.send('/admin/recipes/:id/edit')
}
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  let {image, title, author, ingredients, preparation, information} = req.body

  const id = Number(data.recipes.length + 1)

  data.recipes.push({
    id,
    image,
    title,
    author,
    ingredients,
    preparation,
    information
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('write file error')

    return res.redirect(`recipes/${id}`)
  })
 // return res.send(req.body)
}
exports.put = function(req, res){
  return res.send('put')
}
exports.delete = function(req, res){
  return res.send('delete')
}

