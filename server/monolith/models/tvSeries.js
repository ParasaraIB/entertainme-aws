const { ObjectId } = require("mongodb");

const db = require("../config/mongo.js");

const TvSeries = db.collection("TvSeries");

class TvSeriesModel {
  static findAll() {
    return TvSeries.find().toArray();
  };
  static findById(id) {
    return TvSeries.findOne({_id: ObjectId(id)});
  };
  static create(data) {
    return TvSeries.insertOne(data);
  };
  static update(id, updatedData) {
    return TvSeries.updateOne({_id: ObjectId(id)}, {$set: updatedData});
  };
  static destroy(id) {
    return TvSeries.deleteOne({_id: ObjectId(id)});
  };
};

module.exports = TvSeriesModel;