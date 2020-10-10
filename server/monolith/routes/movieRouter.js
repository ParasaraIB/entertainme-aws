const movieRouter = require("express").Router();

const MovieController = require("../controllers/MovieController");

movieRouter.get("/", MovieController.findAllMovie);
movieRouter.post("/", MovieController.addMovie);
movieRouter.get("/:id", MovieController.findMovieById);
movieRouter.put("/:id", MovieController.editMovie);
movieRouter.delete("/:id", MovieController.deleteMovie);

module.exports = movieRouter;