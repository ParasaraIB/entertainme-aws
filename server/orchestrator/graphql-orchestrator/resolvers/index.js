const axios = require("axios");
const Redis = require("ioredis");

const redis = new Redis();

const movieUrl = "http://localhost:3001/movies";
const tvSeriesUrl = "http://localhost:3002/tv";

const resolvers = {

  Query: {

    async findAllMovies(parent, args) {
      try {
        const movies = JSON.parse(await redis.get("movies"));
        if (movies) {
          return movies;
        } else {
          const { data } = await axios({
            url: movieUrl,
            method: "GET"
          });
          redis.set("movies", JSON.stringify(data));
          return data;
        };
      } catch(err) {
        console.log(err, "<<<< error in findAllMovies");
      };
    },
    
    async findAllTvSeries(parent, args) {
      try {
        const tvSeries = JSON.parse(await redis.get("tvSeries"));
        if (tvSeries) {
          return tvSeries;
        } else {
          const { data } = await axios({
            url: tvSeriesUrl,
            method: "GET"
          });
          redis.set("tvSeries", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        console.log(err, "<<<< error in findAllTvSeries");
      }
    },
    
  }

};

module.exports = resolvers;