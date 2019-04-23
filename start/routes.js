'use strict'

const Route = use('Route')

Route.group(() => {
	Route.resource('posts', 'PostController').apiOnly().middleware('auth')
	Route.resource('comments', 'CommentController').apiOnly()
	Route.post('auth/register', 'AuthController.register')
	Route.post('auth/login', 'AuthController.login')
}).prefix('api/v1')