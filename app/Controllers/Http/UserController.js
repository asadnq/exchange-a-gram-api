'use strict';

const Database = use('Database');
const User = use('App/Models/User');
const Post = use('App/Models/Post');

class UserController {
  async index({ request, response }) {}

  async show({ params, request, response }) {
    try {
      const query = User.query();

      query.with('posts.images');
      const user = await query.where('id', params.id).first();
      return response.status(200).json({
        user
      });
    } catch (err) {
      throw response.json(err);
    }
  }

  async getUserPosts({ params, request, response }) {
    try {
      const getRequest = request.get()

      const page = getRequest.page || 1;
      const limit = getRequest.limit || 9;

      const posts = await Post.query()
        .with('images')
        .where('user_id', params.id)
        .paginate(page, limit);
      return response.json(posts);
    } catch (err) {
      throw response.json(err);
    }
  }
}

module.exports = UserController;
