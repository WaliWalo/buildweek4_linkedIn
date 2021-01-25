const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./schema");
const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    res.status(201).send("POST");
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    res.status(201).send("GET");
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:productId", async (req, res, next) => {
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

usersRouter.put("/:productId", async (req, res, next) => {
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

usersRouter.delete("/:productId", async (req, res, next) => {
  try {
    res.status(201).send("DELETE BY ID");
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
