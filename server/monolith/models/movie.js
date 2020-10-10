const { ObjectId } = require("mongodb");

const db = require("../config/mongo.js");

const Movie = db.collection("Movies");

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