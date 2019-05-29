"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Post extends Model {
  user() {
    return this.belongsTo("App/Models/User", "user_id", "id");
  }
  images() {
    return this.hasMany("App/Models/PostImage", "id", "post_id");
  }
  comments() {
    return this.hasMany("App/Models/Comment", "id", "post_id");  
  }
  likes() {
    return this.hasMany('App/Models/Like', 'id', 'post_id')  
  }
}

module.exports = Post;
