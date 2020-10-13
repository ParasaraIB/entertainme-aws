const { ObjectId } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_URL || "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let Movie;

client.connect(err => {
  Movie = client.db(process.env.DB_NAME || "entertainme").collection("Movies");
});

class MovieModel {
  static findAll() {
    return Movie.find().toArray();
  };
  static findById(id) {
    return Movie.findOne({_id: ObjectId(id)});
  };
  static create(data) {
    return Movie.insertOne(data);
  };
  static update(id, updatedData) {
    return Movie.updateOne({_id: ObjectId(id)}, {$set: updatedData});
  };
  static destroy(id) {
    return Movie.deleteOne({_id: ObjectId(id)});
  };
}

module.exports = MovieModel;