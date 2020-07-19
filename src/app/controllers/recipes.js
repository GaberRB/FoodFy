const fs = require('fs')
const recipes = require("../../../data")
const data = require('../../../data.json')
exports.index = function(req, res){
  const recipe = data.recipes ;
 
  return res.render('admin/recipes/index', {items: recipe})    
}
exports.create = function(req, res){
  return res.render('admin/recipes/create')
}
exports.show = function(req, res){
  const { id } = req.params
 
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
  const { id } = req.params

  const foundRecipe = data.recipes.find(function(recipe){
    return recipe.id == id
  })

  if (!foundRecipe) return res.send('Receita não encontrada')

  const recipe ={
    ...foundRecipe
  }

  return res.render('admin/recipes/edit', { recipe })
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

    return res.redirect(`/admin/recipes/${id}`)
  })
}
exports.put = function(req, res){
  const { id } = req.body
  let index = 0

  const foundRecipe = data.recipes.find(function(recipe, foundIndex){
    if (recipe.id == id){
      index = foundIndex
      return true
    }
  })

  if (!foundRecipe) return res.send('Receita não encontrada')

  const recipe = {
    ...foundRecipe,
    ...req.body,
    id: Number(req.body.id)
  }

  data.recipes[index] = recipe

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if (err) return res.send('Write error!')

    return res.redirect(`/admin/recipes/${id}`)
  })
}
exports.delete = function(req, res){
  const {id} = req.body
  
  const filteredRecipe = data.recipes.filter(function(recipe){
    return recipe.id != id
  })

  data.recipes = filteredRecipe

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write file error')

    return res.redirect('/admin')
  })
}

