"use strict";

const Route = use("Route");

Route.group(() => {
  Route.resource("posts", "PostController").apiOnly();
  Route.get("posts/:id/comments", "PostController.showComments");
  Route.resource("users", "UserController").apiOnly();
  Route.get('users/:id/posts', 'UserController.getUserPosts')
  Route.resource("comments", "CommentController").apiOnly();
  Route.resource("likes", "LikeController").apiOnly();
  Route.post("auth/register", "AuthController.register");
  Route.post("auth/login", "AuthController.login");
  Route.get('auth/user/posts', "AuthController.getUserPosts");
  Route.post("upload", "PostController.test");
}).prefix("api/v1");
