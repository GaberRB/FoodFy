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

