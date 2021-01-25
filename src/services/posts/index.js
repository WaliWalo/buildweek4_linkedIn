const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("./schema");
const postsRouter = express.Router();

// - POST https://yourapi.herokuapp.com/api/posts/
//     Creates a new post
postsRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send("POST");
  } catch (error) {
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/posts/
//     Retrieve posts
postsRouter.get("/", async (req, res, next) => {
  try {
    res.status(201).send("GET");
  } catch (error) {
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/posts/{postId}
// Retrieves the specified post
postsRouter.get("/:postId", async (req, res, next) => {
  try {
    res.status(201).send("GET BY ID");
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
    res.status(201).send("UPDATE BY ID");
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
    res.status(201).send("DELETE BY ID");
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
