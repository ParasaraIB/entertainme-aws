const { gql } = require("apollo-server");

const typeDefs = gql `
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
  input InputMovie {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
  }
  input InputTv {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]!
  }
  type Query {
    findAllMovies: [Movie]
    findMovieById(_id: ID): Movie
    findAllTvSeries: [TvSeries]
    findTvSeriesById(_id: ID): TvSeries
  }
  type Mutation {
    addMovie(movie: InputMovie): Movie
    editMovie(_id: ID, movie: InputMovie): Movie
    deleteMovie(_id: ID): Movie
    addTvSeries(tvSeries: InputTv): TvSeries
    editTvSeries(_id: ID ,tvSeries: InputTv): TvSeries
    deleteTvSeries(_id: ID): TvSeries
  }
`;

module.exports = typeDefs;