const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();

const baseUrl = "http://localhost:3001/movies"

class MovieController {

  static async findAllMovie(req, res, next) {
    try {
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        return res.status(200).json(movies);
      } else {
        const { data } = await axios({
          url: baseUrl,
          method: "GET"
        });
        res.status(200).json(data);
        redis.set("movies", JSON.stringify(data));
      };
    } catch (err) {
      console.log(err, "<<<< error in findAll MovieController");
      next(err);
    }
  };

  static async findMovieById(req, res, next) {
    try {
      const { data } = await axios({
        url: `${baseUrl}/${req.params.id}`,
        method: "GET"
      });
      return res.status(200).json(data);
    } catch(err) {
      console.log(err, "<<<< error in findMovieById MovieController");
      next(err);
    };
  };

  static async addMovie(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const { data } = await axios({
        url: baseUrl,
        method: "POST",
        data : { title, overview, poster_path, popularity, tags }
      });
      res.status(201).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        movies.push(data);
        redis.set("movies", JSON.stringify(movies));
      };
    } catch(err) {
      console.log(err.message, "<<<< error in addMovie MovieController");
      next(err);
    };
  };

  static async editMovie(req, res, next) {
    try {
      console.log("masuk kang")
      const { title, overview, poster_path, popularity, tags } = req.body;
      const { data } = await axios({
        url: `${baseUrl}/${req.params.id}`,
        method: "PUT",
        data: { title, overview, poster_path, popularity, tags }
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        for (let i = 0; i < movies.length; i++) {
          if (movies[i]._id === data._id) {
            movies[i] = data;
            break;
          };
        };
        redis.set("movies", JSON.stringify(movies));
      };
    } catch(err) {
      console.log(err, "error in editMovie MovieController");
      next(err);
    };
  };

  static async deleteMovie(req, res, next) {
    try {
      const { data } = await axios({
        url: `${baseUrl}/${req.params.id}`,
        method: "DELETE"
      });
      res.status(200).json(data);
      const movies = JSON.parse(await redis.get("movies"));
      if (movies) {
        for (let i = 0; i < movies.length; i++) {
          if (movies[i]._id === data._id) {
            movies.splice(i, 1);
            break;
          }
        }
        redis.set("movies", JSON.stringify(movies));
      };
    } catch(err) {
      console.log(err.message, "<<<< error in deleteMovie MovieController");
      next(err);
    };
  };

};

module.exports = MovieController;