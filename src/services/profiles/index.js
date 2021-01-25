const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./schema");
const profilesRouter = express.Router();

// - POST https://yourapi.herokuapp.com/api/profile/
// Create the user profile with all his details
profilesRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send("POST");
  } catch (error) {
    next(error);
  }
});

// - GET https://yourapi.herokuapp.com/api/profile/
//     Retrieves list of profiles
profilesRouter.get("/", async (req, res, next) => {
  try {
    res.status(201).send("GET");
  } catch (error) {
    next(error);
  }
});

// #EXTRA: Find a way to return also the user with the posts, in order to have the Name / Picture to show it correcly on the frontend
// - GET https://yourapi.herokuapp.com/api/profile/{userId}
//     Retrieves the profile with userId = {userId}
profilesRouter.get("/:profileId", async (req, res, next) => {
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

// - PUT https://yourapi.herokuapp.com/api/profile/
//     Update current user profile details
profilesRouter.put("/:profileId", async (req, res, next) => {
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

// - POST https://yourapi.herokuapp.com/api/profile/{userId}/picture
// Replace user profile picture (name = profile)
profilesRouter.post("/:profileId/picture", async (req, res, next) => {
  try {
    res.status(201).send("POST PICTURE BY ID");
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

// - GET https://yourapi.herokuapp.com/api/profile/{userId}/CV
// Generates and download a PDF with the CV of the user (details, picture, experiences)
profilesRouter.get("/:profileId/cv", async (req, res, next) => {
  try {
    res.status(201).send("GET CSV AND DOWNLOAD");
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

profilesRouter.delete("/:profileId", async (req, res, next) => {
  try {
    res.status(201).send("DELETE BY ID");
  } catch (error) {
    next(error);
  }
});

module.exports = profilesRouter;
