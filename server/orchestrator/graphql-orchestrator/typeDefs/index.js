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
  type Tv {
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
  type Query {
    movies: [Movie]
    movie(_id: ID): Movie
    tvs: [Tv]
    tv(_id: ID): Tv
  }
  type Mutation {
    addMovie(movie: InputMovie): Movie
    updateMovie(_id: ID, movie: InputMovie): Movie
    deleteMovie(_id: ID): Movie
    addTv(tv: InputTv): Tv
    updateTv(_id: ID ,tv: InputTv): Tv
    deleteTv(_id: ID): Tv
  }
`;

module.exports = typeDefs;