// UNUSED CODE --> VALIDATION CAN ONLY BE USED IN LOCAL USAGE WITH ../config/mongo.js

const tvSeriesValidation = (db) => {
  db.listCollections().toArray((err, collections) => {
    const check = collections.find((collection) => collection.name === "TvSeries");
    if (!check) {
      db.createCollection("TvSeries", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["title", "overview", "tags", "popularity", "poster_path"],
            properties: {
              title: {
                bsonType: "string",
                description: "title must be a string!"
              },
              overview: {
                bsonType: "string",
                description: "overview must be a string!"
              },
              poster_path: {
                bsonType: "string",
                description: "poster_path must be a string!"
              },
              popularity: {
                bsonType: "number",
                description: "popularity must be in numeric data type!"
              },
              tags: {
                type: ["array"],
                description: "tags must be an array!"
              }
            }
          }
        }
      });
      console.log("TvSeries Collection has been created successfully!");
    }
  });
}

module.exports = tvSeriesValidation;