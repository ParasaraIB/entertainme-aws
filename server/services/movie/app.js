const express = require("express");
const cors = require("cors");

const movieRouter = require("./routes");
const errHandler = require("./middlewares/errHandler");

const app = express();
const PORT = process.env.PORT || 3001;

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
app.use(cors());

// Route
app.use("/movies", movieRouter);

// Error handler
app.use(errHandler);

app.listen(PORT, () => {
  console.log("movie server is listening at http://localhost:3001");
});