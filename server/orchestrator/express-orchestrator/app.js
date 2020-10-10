const express = require("express");
const cors = require("cors");

const movieRouter = require("./routes/movieRouter");
const tvSeriesRouter = require("./routes/tvSeriesRouter");
const errHandler = require("./middlewares/errHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
app.use(cors());

// Movie route
app.use("/entertainme/movies", movieRouter);

// Tv route
app.use("/entertainme/tv", tvSeriesRouter);

// Error handler
app.use(errHandler);

app.listen(PORT, () => {
  console.log("express orchestrator is listening at http://localhost:3000");
})