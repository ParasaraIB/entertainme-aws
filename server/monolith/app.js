const express = require("express");
const cors = require("cors");

const errHandler = require("./middlewares/errHandler.js");
const movieRouter = require("./routes/movieRouter.js");
const tvSeriesRouter = require("./routes/tvSeriesRouter.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
app.use(cors());

// Movie route
app.use(movieRouter);

// TvSeries route
app.use(tvSeriesRouter);

// Error Handler
app.use(errHandler);

app.listen(PORT, () => {
  console.log("entertainme server is listening at http://localhost:3000");
});