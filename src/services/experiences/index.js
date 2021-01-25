const express = require("express");
const mongoose = require("mongoose");
const PostModel = require("./schema");
const postRouter = express.Router();

// - POST https://yourapi.herokuapp.com/api/profile/:userName/experiences
// Create an experience.
postRouter.post("/:userId/experiences", async (req, res, next) => {
  try {
    res.status(201).send("POST");
  } catch (error) {
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences
// Get user experiences
postRouter.get("/:userId/experiences", async (req, res, next) => {
  try {
    res.status(201).send("GET");
  } catch (error) {
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Get a specific experience
postRouter.get("/:userId/experiences/:expId", async (req, res, next) => {
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

// - PUT https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
// Get and update specific experience
postRouter.put("/:userId/experiences/:expId", async (req, res, next) => {
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

// - DELETE https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
//     Get a specific experience
postRouter.delete("/:userId/experiences/:expId", async (req, res, next) => {
  try {
    res.status(201).send("DELETE BY ID");
  } catch (error) {
    next(error);
  }
});

// - POST https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId/picture
//     Change the experience picture
postRouter.post(
  "/:userId/experiences/:expId/picture",
  async (req, res, next) => {
    try {
      res.status(201).send("POST A PHOTO BY ID");
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
  }
);

// - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/CSV
// Download the experiences as a CSV
postRouter.get("/:userId/experiences/csv", async (req, res, next) => {
  try {
    res.status(201).send("get a csv by id");
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

module.exports = postRouter;
