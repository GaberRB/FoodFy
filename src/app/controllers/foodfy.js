

exports.index = function(req, res){
    return res.render("foodfy/index")
}
exports.about = function(req, res){
    return res.render("foodfy/about")
}
exports.recipes = function(req, res){
    return res.render("foodfy/recipes", {items: recipes})
}
exports.recipe = function (req, res) {
    const recipe = recipes ;
    const recipeIndex = req.params.index;
    return res.render("foodfy/recipe", {items: recipe[recipeIndex]})

  }