import { gql } from "@apollo/client";

export const FIND_ALL_MOVIES = gql`
  {
    findAllMovies {
      _id
      poster_path
    }
  }
`;

export const FIND_MOVIE_BY_ID = gql`
  query findMovieById($_id: ID!) {
    findMovieById(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation addMovie($movie: InputMovie) {
    addMovie(movie: $movie) {
      _id
      poster_path 
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation editMovie($_id: ID!, $movie: InputMovie) {
    editMovie(_id: $_id, movie: $movie) {
      _id
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID!) {
    deleteMovie(_id: $_id) {
      _id
    }
  }
`;