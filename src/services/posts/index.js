const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("./schema");
const UserModel = require("../profiles/schema")
const postsRouter = express.Router();

// - POST https://yourapi.herokuapp.com/api/posts/
//     Creates a new post
postsRouter.post("/:userId/", async (req, res, next) => {
  try {
    //GET USER
    const userId = req.params.userId
    const user = await UserModel.findById(userId)
    //POST
    let body = {...req.body, user: user}
    const newPost = new PostModel(body),
        {_id} = await newPost.save()
    res.status(201).send(newPost);
  } catch (error) {
    console.log(error)
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/posts/
//     Retrieve posts
postsRouter.get("/", async (req, res, next) => {
  try {
    let posts
    if (req.query && req.query.userId) {
      //GET USER
      const userId = req.query.userId
      const user = await UserModel.findById(userId)
      posts = await PostModel.find({user : userId})
    } else {
      posts = await PostModel.find()
    } 
    //GET POSTS
    res.status(201).send(posts);
  } catch (error) {
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/posts/{postId}
// Retrieves the specified post
postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId)
    res.status(201).send(post);
  } catch (error) {
    const err = new Error();
    if (error.name == "CastError") {
      err.message = "Product Not Found";
      err.httpStatusCode = 404;
      next(err);
    } else {
      next(error);
    }
  }
});

// - PUT https://yourapi.herokuapp.com/api/posts/{postId}
// Edit a given post
postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const post = await PostModel.findByIdAndUpdate(req.params.postId, req.body, {
      runValidators: true,
      new: true,
    })
    if (post) {
      res.send(post)
    } else {
      const error = new Error(`post with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    const err = new Error();
    if (error.name == "CastError") {
      err.message = "Product Not Found";
      err.httpStatusCode = 404;
      next(err);
    } else {
      next(error);
    }
  }
});

// - DELETE https://yourapi.herokuapp.com/api/posts/{postId}
// Removes a post
postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const deletePost = await Posts.findByIdAndDelete(req.params.postId)
    if (deletePost) {
      res.send("DELETE BY ID");
    } else {
      const err = new Error(`Post with id : ${req.params.postId}`);
      err.httpStatusCode = 404
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

// - POST https://yourapi.herokuapp.com/api/posts/{postId}
// Add an image to the post under the name of "post"
postsRouter.post("/:postId/picture", async (req, res, next) => {
  try {
    res.status(201).send("POST A PICTURE BY ID");
  } catch (error) {
    const err = new Error();
    if (error.name == "CastError") {
      err.message = "Product Not Found";
      err.httpStatusCode = 404;
      next(err);
    } else {
      next(error);
    }
  }
});
module.exports = postsRouter;
