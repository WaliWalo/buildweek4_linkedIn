const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./schema");
const profilesRouter = express.Router();

const multer = require("multer");
const cloudinary = require("../cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "User Images",
  },
});

const cloudinaryMulter = multer({ storage: storage });

// - POST https://yourapi.herokuapp.com/api/profile/
// Create the user profile with all his details
profilesRouter.post(
  "/",
  cloudinaryMulter.single("image"),
  async (req, res, next) => {
    try {
      console.log("req file", req.file.path);
      const newProfile = new UserModel(req.body);
      newProfile.image = req.file.path;
      const { _id } = await newProfile.save();
      res.status(201).send(_id);
    } catch (error) {
      next(error);
    }
  }
);

// - GET https://yourapi.herokuapp.com/api/profile/
//     Retrieves list of profiles
profilesRouter.get("/", async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();

    res.status(201).send(allUsers);
  } catch (error) {
    next(error);
  }
});

// #EXTRA: Find a way to return also the user with the posts, in order to have the Name / Picture to show it correcly on the frontend
// - GET https://yourapi.herokuapp.com/api/profile/{userId}
//     Retrieves the profile with userId = {userId}
profilesRouter.get("/:profileId", async (req, res, next) => {
  try {
    const selectedProfile = await UserModel.findById(req.params.profileId);

    res.status(201).send(selectedProfile);
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
    const selectedProfile = await UserModel.findByIdAndUpdate(
      req.params.profileId,
      req.body,
      { runValidators: true, new: true }
    );

    if (selectedProfile) {
      res.status(201).send(selectedProfile);
    } else {
      res.send("This profile doesn't exists");
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

// - POST https://yourapi.herokuapp.com/api/profile/{userId}/picture
// Replace user profile picture (name = profile)
profilesRouter.post(
  "/:profileId/picture/",
  cloudinaryMulter.single("image"),
  async (req, res, next) => {
    try {
      const profile = await UserModel.findById(req.params.profileId);

      if (profile) {
        const updateProfile = await UserModel.findByIdAndUpdate(
          req.params.profileId,
          { $set: { image: req.file.path } },
          { new: true, useFindAndModify: false }
        );
        res.status(201).send(updateProfile);
      } else {
        let error = new Error("EXPERIENCE NOT FOUND");
        error.httpStatusCode = 404;
        next(error);
      }
      res.status(201).send(selectedImage);
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

// - GET https://yourapi.herokuapp.com/api/profile/{userId}/CV
// Generates and download a PDF with the CV of the user (details, picture, experiences)
profilesRouter.get("/:profileId/cv", pdfController.download);

profilesRouter.delete("/:profileId", async (req, res, next) => {
  try {
    const selectedProfile = await UserModel.findByIdAndDelete(
      req.params.profileId
    );

    if (selectedProfile) {
      res.send("Profile deleted!");
    } else {
      res.send("Profile not found");
    }

    res.status(201).send("DELETE BY ID");
  } catch (error) {
    next(error);
  }
});

module.exports = profilesRouter;
