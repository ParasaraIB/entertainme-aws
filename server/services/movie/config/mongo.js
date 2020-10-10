const { MongoClient } = require("mongodb");

const movieValidation = require("../helpers/movieValidation.js");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const dbName = process.env.dbName || "entertainme";

const client = new MongoClient(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect();

const db = client.db(dbName);
movieValidation(db);

module.exports = db;