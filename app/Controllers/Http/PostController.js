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
    const posts = await Post.all();

    const postsJSON = await posts.toJSON();

    let promises = postsJSON.map(async post => {
      let post_image = await PostImage.query()
        .where('post_id', post.id)
        .first();
      let user = await User.find(post.user_id)
      return {
        user:{
          username: user.username,
          profile_pict: user.profile_pict
        },
        ...post,
        image: post_image
      };
    });

    let merged = await Promise.all(promises);

    return response.json({
      data: merged
    });
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
        // name: 'awkwkw.jpg',
        overwrite: true
      });

      if (!image.moved()) {
        return console.log(image.error());
      }
      console.log(image.name)
      const post_image = await PostImage.create({
        image: fileNameToStore,
        post_id: post.id
      });

      const merged = {
        username: user.username,
        ...post,
        image: post_image
      };

      console.log(merged);
      return response.json({
        data: merged
      });
    } catch (err) {
      console.log(err);
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
  async show({ params, request, response, view }) {}

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

  async test({ params, request, response }) {}
}

module.exports = PostController;
