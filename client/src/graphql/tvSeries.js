import { gql } from "@apollo/client";

export const FIND_ALL_TVSERIES = gql`
  {
    findAllTvSeries {
      _id
      poster_path
    }
  }
`;

export const FIND_TVSERIES_BY_ID = gql`
  query findTvSeriesById($_id: ID!) {
    findTvSeriesById(_id: $_id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const ADD_TVSERIES = gql`
  mutation addTvSeries($tvSeries: InputTvSeries) {
    addTvSeries(tvSeries: $tvSeries) {
      _id
      poster_path
    }
  }
`;

export const EDIT_TVSERIES = gql`
  mutation editTvSeries($_id: ID!, $tvSeries: InputTvSeries) {
    editTvSeries(_id: $_id, tvSeries: $tvSeries) {
      _id
    }
  }
`;

export const DELETE_TVSERIES = gql`
  mutation deleteTvSeries($_id: ID!) {
    deleteTvSeries(_id: $_id) {
      _id
    }
  }
`;