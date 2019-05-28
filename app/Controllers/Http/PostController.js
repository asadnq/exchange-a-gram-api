'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
const Database = use('Database');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const Helpers = use('Helpers');
const PostImage = use('App/Models/PostImage');
const Comment = use('App/Models/Comment');

class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const getRequest = request.get();

    const page = getRequest.page || 1;
    const limit = getRequest.limit || 10;

    const query = Post.query();

    query.with('images');
    query.with('user');

    const posts = await query.paginate(page, limit);

    return response.json(posts);
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    try {
      const { body } = request.post();
      const user = await auth.getUser();
      const post = await Post.create({ body, user_id: user.id });

      const image = request.file('image', {
        types: ['image'],
        size: '2mb'
      });

      const uniqueTime = new Date().getTime();
      const fileNameToStore = `${uniqueTime}_post_${post.id}_${user.id}.jpg`;

      await image.move(Helpers.publicPath('uploads/post_images'), {
        name: fileNameToStore,
        overwrite: true
      });

      if (!image.moved()) {
        return console.log(image.error());
      }
      const post_image = await PostImage.create({
        image: fileNameToStore,
        post_id: post.id
      });

      const merged = {
        user: {
          username: user.username,
          profile_pict: user.profile_pict
        },
        ...post.toJSON(),
        image: post_image
      };

      console.log(merged);
      return response.json({
        data: merged
      });
    } catch (err) {
      return response.send(err);
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    try {
      const post_id = params.id;

      const query = Post.query();
      query.with('images');
      query.with('user');

      const post = await query.where('id', post_id).first();
      return response.json({
        data: post  
      })      
    } catch (err) {
      return response.json(err);
    }
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}

  async showComments({ params, request, response }) {
    try {
      const post_id = params.id;   

      const query = Post.query();
      
      query.with('comments.user');
      query.with('user');
      
      const post = await query.where('id', post_id).first();

      return response.json({
        data: post  
      })      
    } catch(err) {
      console.log(err)   
    }
  }

  async test({ params, request, response }) {}
}

module.exports = PostController;
