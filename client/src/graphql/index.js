import { gql } from "@apollo/client";

export const FIND_ALL = gql`
  {
    findAllMovies {
      _id
      poster_path
    }
    findAllTvSeries {
      _id
      poster_path
    }
  }
`;

export const GET_FAVORITES = gql`
  query {
    favorites @client
  }
`;