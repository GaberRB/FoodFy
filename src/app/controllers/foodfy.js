const Chef = require('./../models/Chef')
const Recipe = require('./../models/Recipe')

module.exports = {
    index(req, res){
        Recipe.all(function(recipes){
            return res.render("foodfy/index", { recipes })
        })
        
    },
    about(req, res){
        return res.render("foodfy/about") 
    },
    chefs(req, res){

        let {filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(chefs){
                const pagination = {
                    total: Math.ceil(chefs[0].total / limit),
                    page
                }

                return res.render('foodfy/chefs', {chefs, pagination, filter})    
            }
        }
        Chef.paginate(params)
 
    },
    showRecipe(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe não encontrado")

            return res.render('foodfy/recipe', { recipe })
        })
    },
    showChef(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef não encontrado")
            Chef.recipeOnChef(req.params.id, function(recipes){
                return res.render('foodfy/chef', { chef, recipes })
            })
            
        })
    },
    recipes(req, res){

        let {filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3

        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(recipes){
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                return res.render('foodfy/recipes', {recipes, pagination, filter})
            }
        }
        Recipe.paginate( params )
                
    }
}

