const fs = require('fs')
const Intl = require('intl')
const data = require('../../../data.json')
const Chef = require('../models/Chef')
//const chefs = require("../../../data")

module.exports = {

    index(req, res){
        Chef.all(function(chefs){
            
            return res.render('admin/chefs/index', {chefs})    
        })
        
        
    },
    create(req, res){
        return res.render('admin/chefs/create')
        
    },
    post(req, res){
        const keys = Object.keys(req.body)

        for (key of keys ){
            if(req.body[key] == ""){
                return res.send('Por favor digite todos os campos!')
            }
        }
        Chef.create(req.body, function(chef){
            return res.redirect(`/admin/chefs/${chef.id}`)
        })
    },
    show(req, res){
        
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef não encontrado")
            Chef.recipeOnChef(req.params.id, function(recipes){
                return res.render('admin/chefs/show', { chef, recipes })
            })
            
        })
    },
    edit(req, res){
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send('Chef não encontrado')

            return res.render('admin/chefs/edit', {chef})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for (key of keys){

            if (req.body[key] == "")
                return res.send('Preencha todos os campos')
        }

        Chef.update(req.body, function(){
            return res.redirect(`/admin/chefs/${req.body.id}`)
        })
    },
    delete(req, res){
        Chef.delete(req.body.id, function(){
            return res.redirect('/admin/chefs')
        })
    }
}    