const { ObjectId } = require("mongodb");
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_URL || "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let TvSeries;

client.connect(err => {
  TvSeries = client.db(process.env.DB_NAME || "entertainme").collection("TvSeries");
});

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