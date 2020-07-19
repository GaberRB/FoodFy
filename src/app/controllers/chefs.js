const fs = require('fs')
const Intl = require('intl')
const data = require('../../../data.json')
const Chef = require('../models/Chef')
//const chefs = require("../../../data")

module.exports = {

    index(req, res){

        return res.render('admin/chefs/index')    
        
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
            return res.send('Cadastrado')
        })
    },
    show(req, res){
        
        Chef.find(req.params.id, function(chef){
            if(!chef) return res.send("Chef não encontrado")

            return res.render('admin/chefs/show', { chef })
        })
    }
}    