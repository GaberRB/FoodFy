const db = require ('../../config/db')
const { date } = require('../../lib/utils')
const Intl = require('intl')
module.exports = {
    all(callback){
        db.query(`
            SELECT chefs.*,COUNT(recipes) AS total_recipes
            FROM chefs 
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id
            ORDER BY chefs.name ASC
             `,function(err, results){
                 if(err) throw `Database error! - all ${err}`

                 callback(results.rows)
             })
    },
    create(data, callback){

        
        const query = `
            INSERT INTO chefs (
                name, 
                avatar_url,
                created_at
            )VALUES (
                $1, $2, $3
            )RETURNING id
        `
        const values = [
            data.name,
            data.avatar_url,
            date(Date.now()).iso

        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database error! - create ${err}`
           
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
            SELECT chefs.*, COUNT(recipes) AS total_recipes
            FROM chefs 
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
                        
        `, [id], function(err, results){
            if(err) throw `Database error! - Show ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){

        const query = `
            UPDATE chefs SET
                name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]
        
        db.query(query, values, function(err, results){
            if (err) throw `Database error! -update ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM chefs WHERE id = $1`, [id],
        function(err, results){
            if(err) throw `Database error! -delete ${err}`
             callback()
        })
    },
    recipeOnChef(id, callback){
        db.query(`SELECT recipes.id, recipes.title, recipes.image
                 FROM recipes 
                 WHERE chef_id = $1`, [id],
        function(err, results){
            if(err) throw `Database error! -recipeOnChef ${err}`
             callback(results.rows)
        })
    }
}