const db = require ('../../config/db')
const { date } = require('../../lib/utils')
const Intl = require('intl')
const { off } = require('../../config/db')
module.exports = {
    all(callback){
        db.query(`
            SELECT recipes.*,chefs.name AS author
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            ORDER BY recipes.title ASC
             `,function(err, results){
                 if(err) throw `Database error! - all ${err}`

                 callback(results.rows)
             })
    },
    create(data, callback){

        
        const query = `
            INSERT INTO recipes (
                chef_id, 
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            )VALUES (
                $1, $2, $3, $4, $5, $6, $7
            )RETURNING id
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso

        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database error! - create ${err}`
           
            callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
            SELECT recipes.*,chefs.name AS author
            FROM recipes 
            LEFT JOIN chefs ON (chefs.id = recipes.chef_id)
            WHERE recipes.id = $1
        `, [id], function(err, results){
            if(err) throw `Database error! - Show ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback){

        const query = `
            UPDATE recipes SET
                chef_id = ($1),
                image = ($2),
                title = ($3),
                ingredients = ($4),
                preparation = ($5),
                information = ($6)
            WHERE id = $7
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]
        db.query(query, values, function(err, results){
            if (err) throw `Database error! -update ${err}`

            callback()
        })
    },
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id = $1`, [id],
        function(err, results){
            if(err) throw `Database error! -delete ${err}`
             callback()
        })
    },
    ChefSelectOptions(callback){
        db.query(`SELECT name, id FROM chefs`, function(err, results){
            if(err) throw `Database error! -ChefSelectOptions ${err}`
            callback(results.rows) 
        })
    },
    paginate(params){
        const {filter, limit, offeset, callback} = params

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT COUNT(*) FROM recipes) AS total`

        if ( filter ){
            filterQuery = `WHERE recipes.title ILIKE '%${filter}%'
                            OR chefs.name ILIKE '%${filter}%'
                            `
        totalQuery = `(
            SELECT COUNT(*) FROM recipes
            ${filterQuery}
            )AS total`                            
        }

        query = `
            SELECT recipes.*, (chefs.name) AS author, ${totalQuery}
            FROM recipes
            ${filterQuery}
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            GROUP BY recipes.id, chefs.name
            LIMIT $1 OFFSET $2
            `

        db.query(query, [limit, offeset], function(err, results){
            if(err) throw `Database error - paginate ${err}`

            callback(results.rows)
        })

    }
}