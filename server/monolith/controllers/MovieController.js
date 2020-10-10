const MovieModel = require("../models/movie.js");

class MovieController {

  static async findAllMovie(req, res, next) {
    try {
      const movies = await MovieModel.findAll();
      return res.status(200).json(movies);
    } catch(err) {
      next(err);
    };
  };

  static async findMovieById(req, res, next) {
    try {
      const id = req.params.id
      const movie = await MovieModel.findById(id);
      return res.status(200).json(movie);
    } catch(err) {
      next(err);
    };
  };

  static async addMovie(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const validatedTags = tags.map((tag) => {
        return tag.trim();
      });
      const newMovie = {
        title,
        overview,
        poster_path,
        popularity,
        tags: validatedTags
      };
      const movie = await MovieModel.create(newMovie);
      return res.status(201).json(movie.ops[0]);
    } catch(err) {
      next(err);
    };
  };

  static async editMovie(req, res, next) {
    try {
      const id = req.params.id;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const validatedTags = tags.map((tag) => {
        return tag.trim();
      });
      const updatedMovie = {
        title,
        overview,
        poster_path,
        popularity,
        tags: validatedTags
      };
      await MovieModel.update(id, updatedMovie);
      const newMovie = await MovieModel.findById(id);
      return res.status(200).json(newMovie);
    } catch(err) {
      next(err);
    };
  };

  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id;
      const deletedMovie = await MovieModel.findById(id);
      if (deletedMovie === null) {
        throw({ statusCode: 404, message: "Invalid id" });
      } else {
        await MovieModel.destroy(id);
        return res.status(200).json(deletedMovie);
      }
    } catch(err) {
      next(err);
    };
  };

};

module.exports = MovieController;