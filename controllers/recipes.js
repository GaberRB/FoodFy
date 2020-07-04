const recipes = require("../data")
exports.index = function(req, res){
  const recipe = recipes ;
  return res.render('admin/recipes/index', {items: recipe})    
}
exports.create = function(req, res){
  return res.send('/amdin/recipes/create')
}
exports.show = function(req, res){
  const recipe = recipes ;
  const recipeIndex = req.params.index
  console.log(req.params.index)
  
  return res.render('admin/recipes/recipe', {items: recipe[recipeIndex]})    
}
exports.edit = function(req, res){
return res.send('/admin/recipes/:id/edit')
}
exports.post = function(req, res){
  return res.send('req.body')
}
exports.put = function(req, res){
  return res.send('put')
}
exports.delete = function(req, res){
  return res.send('delete')
}

