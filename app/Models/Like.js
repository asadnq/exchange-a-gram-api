'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Like extends Model {
    post() {
        return this.belongsTo('App/Models/Post', 'id', 'post_id')    
    }

    user() {
        return this.belongsTo('App/Models/user', 'id', 'user_id')    
    }
}

module.exports = Like
