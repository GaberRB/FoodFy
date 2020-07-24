const Intl = require('intl')
const Recipe = require('../models/Recipe')

module.exports = {

    index(req, res){

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

                return res.render('admin/recipes/index', {recipes, pagination, filter})
            }
        }
        Recipe.paginate( params )
                
    },
    create(req, res){
        Recipe.ChefSelectOptions(function(options){
          return res.render('admin/recipes/create', {chefsOptions: options})
        })
        
        
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys ){
            if(req.body[key] == ""){
                return res.send('Por favor digite todos os campos!')
            }
        }
        Recipe.create(req.body, function(recipe){
            return res.redirect(`/admin/recipes/${recipe.id}`)
        })
    },
    show(req, res){
        
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send("Recipe não encontrado")

            return res.render('admin/recipes/show', { recipe })
        })
    },
    edit(req, res){
        Recipe.find(req.params.id, function(recipe){
            if(!recipe) return res.send('Recipe não encontrado')

            Recipe.ChefSelectOptions(function(options){
                return res.render('admin/recipes/edit', {recipe, chefsOptions: options})
            })

            
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){

            if (req.body[key] == "")
                return res.send('Preencha todos os campos')
        }

        Recipe.update(req.body, function(){
            return res.redirect(`/admin/recipes/${req.body.id}`)
        })
    },
    delete(req, res){
        Recipe.delete(req.body.id, function(){
            return res.redirect('/admin/recipes')
        })
    }
}    