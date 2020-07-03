exports.index = function(req, res){
    return res.render('admin/recipes/index')    
}
exports.create = function(req, res){
  return res.send('/amdin/recipes/create')
}
exports.show = function(req, res){
  return res.send('/admin/recipes/:id')    
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

