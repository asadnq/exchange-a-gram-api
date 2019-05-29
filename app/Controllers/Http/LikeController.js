'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with likes
 */
const Like = use('App/Models/Like');
class LikeController {
  /**
   * Show a list of all likes.
   * GET likes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new like.
   * POST likes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    try {
      const user = await auth.getUser();
      const { post_id } = request.post();

      const find_like = await Like.query()
        .where('user_id', user.id)
        .andWhere('post_id', post_id)
        .first();

      if (find_like) {
        await find_like.delete();

        return response
          .status(200)
          .json({ data: find_like, message: 'disliked success.' });
      } else {
        const like = await Like.create({ post_id, user_id: user.id });

        return response.status(201).json({ data: like });
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Display a single like.
   * GET likes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Update like details.
   * PUT or PATCH likes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a like with id.
   * DELETE likes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = LikeController;
