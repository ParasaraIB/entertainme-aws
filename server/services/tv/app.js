const express = require("express");
const cors = require("cors");

const tvSeriesRouter = require("./routes");
const errHandler = require("../movie/middlewares/errHandler");

const app = express();
const PORT = process.env.PORT || 3002;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
app.use(cors());

// Route
app.use("/tv", tvSeriesRouter);

// Error handler
app.use(errHandler);

app.listen(PORT, () => {
  console.log("tv series server is listening at http://localhost:3002");
});