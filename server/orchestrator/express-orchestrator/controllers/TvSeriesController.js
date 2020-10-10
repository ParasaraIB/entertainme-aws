const axios = require("axios");
const Redis = require("ioredis");
const e = require("express");
const redis = new Redis();

const baseUrl = "http://localhost:3002/tv";

class TvSeriesController {

  static async findAllTvSeries(req, res, next) {
    try {
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        return res.status(200).json(tvSeries);
      } else {
        const { data } = await axios({
          url: baseUrl,
          method: "GET"
        });
        res.status(200).json(data);
        redis.set("tvSeries", JSON.stringify(data));
      }
    } catch(err) {
      console.log(err, "<<<< error in findAllTvSeries TvSeriesController");
      next(err);
    };
  };

  static async findTvSeriesById(req, res, next) {
    try {
      const { data } = await axios({
        url: `${baseUrl}/${req.params.id}`,
        method: "GET"
      });
      return res.status(200).json(data);
    } catch(err) {
      console.log(err, "<<<< error in findTvSeriesById TvSeriesController");
      next(err);
    };
  };

  static async addTvSeries(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const { data } = await axios({
        url: baseUrl,
        method: "POST",
        data: { title, overview, poster_path, popularity, tags }
      });
      res.status(201).json(data);
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        tvSeries.push(data);
        redis.set("tvSeries", JSON.stringify(tvSeries));
      };
    } catch(err) {
      console.log(err, "<<<< error in addTvSeries TvSeriesController");
      next(err);
    };
  };

  static async editTvSeries(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const { data } = await axios({
        url: `${baseUrl}/${req.params.id}`,
        method: "PUT",
        data: { title, overview, poster_path, popularity, tags }
      });
      res.status(200).json(data);
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        for (let i = 0; i < tvSeries.length; i++) {
          if (tvSeries[i]._id === data._id) {
            tvSeries[i] = data;
            break;
          };
        };
        redis.set("tvSeries", JSON.stringify(tvSeries));
      };
    } catch(err) {
      console.log(err, "error in editTvSeries TvSeriesController");
      next(err);
    };
  };

  static async deleteTvSeries(req, res, next) {
    try {
      const { data } = await axios({
        url: `${baseUrl}/${req.params.id}`,
        method: "DELETE"
      });
      res.status(200).json(data);
      const tvSeries = JSON.parse(await redis.get("tvSeries"));
      if (tvSeries) {
        for (let i = 0; i < tvSeries.length; i++) {
          if (tvSeries[i]._id === data._id) {
            tvSeries.splice(i, 1);
            break;
          };
        };
        redis.set("tvSeries", JSON.stringify(tvSeries));
      };
    } catch(err) {
      console.log(err, "<<<< error in deleteTvSeries TvSeriesController");
      next(err);
    };
  };

};

module.exports = TvSeriesController;