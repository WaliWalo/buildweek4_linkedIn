const express = require("express");
const cors = require("cors");
const { join } = require("path");
const listEndpoints = require("express-list-endpoints");
const mongoose = require("mongoose");

const profilesRouter = require("./services/profiles");
const experiencesRouter = require("./services/experiences");
const postsRouter = require("./services/posts");

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers");

const server = express();

const port = process.env.PORT;

server.use(express.json());

server.use(cors());

server.use("/profiles", profilesRouter);
server.use("/experiences", experiencesRouter);
server.use("/posts", postsRouter);

// ERROR HANDLERS MIDDLEWARES

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("Running on port", port);
    })
  )
  .catch((err) => console.log(err));
