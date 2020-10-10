const TvSeriesModel = require("../models/tvSeries.js");

class TvSeriesController {

  static async findAllTvSeries(req, res, next) {
    try {
      const tvSeries = await TvSeriesModel.findAll();
      return res.status(200).json(tvSeries);
    } catch(err) {
      next(err);
    };
  };

  static async findTvSeriesById(req, res, next) {
    try {
      const id = req.params.id;
      const tvSeries = await TvSeriesModel.findById(id);
      return res.status(200).json(tvSeries);
    } catch(err) {
      next(err);
    };
  };

  static async addTvSeries(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body;
      const validatedTags = tags.map((tag) => {
        return tag.trim();
      });
      const newTvSeries = {
        title,
        overview,
        poster_path,
        popularity,
        tags: validatedTags
      };
      const tvSeries = await TvSeriesModel.create(newTvSeries);
      return res.status(201).json(tvSeries.ops[0]);
    } catch(err) {
      next(err);
    };
  };

  static async editTvSeries(req, res, next) {
    try {
      const id = req.params.id;
      const { title, overview, poster_path, popularity, tags } = req.body;
      const validatedTags = tags.map((tag) => {
        return tag.trim();
      });
      const updatedTvSeries = {
        title,
        overview,
        poster_path,
        popularity,
        tags: validatedTags
      };
      await TvSeriesModel.update(id, updatedTvSeries);
      const newTvSeries = await TvSeriesModel.findById(id);
      return res.status(200).json(newTvSeries);
    } catch(err) {
      next(err);
    };
  };

  static async deleteTvSeries(req, res, next) {
    try {
      const id = req.params.id;
      const deletedTvSeries = await TvSeriesModel.findById(id);
      if (deletedTvSeries === null) {
        throw({ statusCode: 404, message: "Invalid id" });
      } else {
        await TvSeriesModel.destroy(id);
        return res.status(200).json(deletedTvSeries);
      }
    } catch(err) {
      next(err);
    }
  };
  
};

module.exports = TvSeriesController;