const Intl = require('intl')
const Chef = require('../models/Chef')
//const chefs = require("../../../data")

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
            callback(chefs){
                const pagination = {
                    total: Math.ceil(chefs[0].total / limit),
                    page
                }

                return res.render('admin/chefs/index', {chefs, pagination, filter})    
            }
        }
        Chef.paginate(params)
 
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