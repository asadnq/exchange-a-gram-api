'use strict'

const Route = use('Route')

Route.group(() => {
	Route.resource('posts', 'PostController').apiOnly()
	Route.get('posts/:id/comments', 'PostController.showComments')

	Route.resource('comments', 'CommentController').apiOnly()
	Route.post('auth/register', 'AuthController.register')
	Route.post('auth/login', 'AuthController.login')
	Route.post('upload', 'PostController.test');
}).prefix('api/v1')