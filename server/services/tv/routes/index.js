const tvSeriesRouter = require("express").Router();

const TvSeriesController = require("../controllers/TvSeriesController");

tvSeriesRouter.get("/", TvSeriesController.findAllTvSeries);
tvSeriesRouter.post("/", TvSeriesController.addTvSeries);
tvSeriesRouter.get("/:id", TvSeriesController.findTvSeriesById);
tvSeriesRouter.put("/:id", TvSeriesController.editTvSeries);
tvSeriesRouter.delete("/:id", TvSeriesController.deleteTvSeries);

module.exports = tvSeriesRouter;