const axios = require("axios");
const Redis = require("ioredis");

let redis;
if (process.env.REDISLABS_HOST && process.env.REDISLABS_PASSWORD) {
  redis = new Redis({
    port: 18441,
    host: process.env.REDISLABS_HOST,
    password: process.env.REDISLABS_PASSWORD
  });
} else {
  redis = new Redis({
    port: 6379,
    host: "127.0.0.1"
  });
};

const movieUrl = "http://localhost:3001/movies";
const tvSeriesUrl = "http://localhost:3002/tv";

const resolvers = {

  Query: {
    // MOVIES
    async findAllMovies(parent, args, context, info) {
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
    async findMovieById(_, args) {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: `${movieUrl}/${_id}`,
          method: "GET"
        });
        return data;
      } catch(err) {
        console.log(err, "<<<< error in findMovieById");
      };
    },
    
    // TV SERIES
    async findAllTvSeries(_, args) {
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
    async findTvSeriesById(_, args) {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: `${tvSeriesUrl}/${_id}`,
          method: "GET"
        });
        return data;
      } catch(err) {
        console.log(err, "<<<< error in findTvSeriesById");
      };
    }
  },

  Mutation: {
    // MOVIES
    async addMovie (_, args) {
      try {
        const { movie } = args;
        const { data } = await axios({
          url: movieUrl,
          method: "POST",
          data: movie
        });
        await redis.del("movies");
        return data;
      } catch(err) {
        console.log(err, "<<<< error in addMovie");
      };
    },
    async editMovie(_, args) {
      try {
        const { _id, movie } = args;
        const { data } = await axios({
          url: `${movieUrl}/${_id}`,
          method: "PUT",
          data: movie
        });
        await redis.del("movies");
        return data;
      } catch(err) {
        console.log(err, "<<<< error in editMovie");
      };
    },
    async deleteMovie(_, args) {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: `${movieUrl}/${_id}`,
          method: "DELETE"
        });
        await redis.del("movies");
        return data;
      } catch(err) {
        console.log(err, "<<<< error in deleteMovie");
      }
    },

    // TV SERIES
    async addTvSeries(_, args) {
      try {
        const { tvSeries } = args;
        const { data } = await axios({
          url: tvSeriesUrl,
          method: "POST",
          data: tvSeries
        });
        await redis.del("tvSeries");
        return data;
      } catch(err) {
        console.log(err, "<<<< error in addTvSeries");
      };
    },
    async editTvSeries(_, args) {
      try {
        const { _id, tvSeries } = args;
        const { data } = await axios({
          url: `${tvSeriesUrl}/${_id}`,
          method: "PUT",
          data: tvSeries
        });
        await redis.del("tvSeries");
        return data;
      } catch(err) {
        console.log(err, "<<<< error in editTvSeries");
      };
    },
    async deleteTvSeries(_, args) {
      try {
        const { _id } = args;
        const { data } = await axios({
          url: `${tvSeriesUrl}/${_id}`,
          method: "DELETE"
        });
        await redis.del("tvSeries");
        return data;
      } catch(err) {
        console.log(err, "<<<< error in deleteTvSeries");
      };
    }
  }

};

module.exports = resolvers;