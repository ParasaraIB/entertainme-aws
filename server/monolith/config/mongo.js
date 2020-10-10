const { MongoClient } = require("mongodb");

const movieValidation = require("../helpers/movieValidation.js");
const tvSeriesValidation = require("../helpers/tvSeriesValidation.js");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const dbName = process.env.dbName || "entertainme-monolith";

const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect();

const db = client.db(dbName);
movieValidation(db);
tvSeriesValidation(db);

module.exports = db;