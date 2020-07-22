const Intl = require('intl')
const data = require('../../../data.json')
const Recipe = require('../models/Recipe')
//const recipes = require("../../../data")

module.exports = {

    index(req, res){
        Recipe.all(function(recipes){
            
            return res.render('admin/recipes/index', {recipes})    
        })
        
        
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

            return res.render('admin/recipes/edit', {recipe})
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