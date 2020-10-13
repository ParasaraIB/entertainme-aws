import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";

import { FIND_ALL_MOVIES, DELETE_MOVIE } from "../graphql/movies.js";
import { FIND_ALL_TVSERIES, DELETE_TVSERIES } from "../graphql/tvSeries.js"
import { favorites } from "../config/client.js";
import { GET_FAVORITES } from "../graphql";

const Dialog = (props) => {

  const history = useHistory();
  const [ , setCloseDialog ] = useState(false);

  const { data } = useQuery(GET_FAVORITES, {
    refetchQueries: [{ query: GET_FAVORITES }]
  });

  const [ deleteMovie ] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: FIND_ALL_MOVIES}]
  });

  const [ deleteTvSeries ] = useMutation(DELETE_TVSERIES, {
    refetchQueries: [{ query: FIND_ALL_TVSERIES}]
  });

  const dialogStyles = {
    width: "500px",
    maxWidth: "100%",
    margin: "0 auto",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    backgroundColor: "#fc7777",
    padding: "10px 20px 40px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
  };

  const dialogCloseButtonStyles = {
    marginBottom: "15px",
    padding: "3px, 8px",
    cursor: "pointer",
    borderRadius: "50%",
    border: "none",
    width: "30px",
    height: "30px",
    fontWeight: "bold",
    alignSelf: "flex-end",
    backgroundColor: "#fc7777",
    color: "#f7f7f7"
  };

  const handleClose = (e) => {
    setCloseDialog(props.onCloseDialog);
  };

  const handleYes = (e) => {
    if (props.typename === "Movie") {
      const id = props.deleteData.findMovieById._id;
      deleteMovie({
        variables: { _id: id }
      });
      toast.success("A movie has been deleted");
      history.goBack();
    } else if (props.typename === "TvSeries") {
      const id = props.deleteData.findTvSeriesById._id;
      deleteTvSeries({
        variables: { _id: id }
      });
      toast.success("A tv series has been deleted");
      history.goBack();
    } else {
      const newFavorites = data.favorites.filter((favorite) => {
      return favorite._id !== props.deleteId;
      });
      favorites(newFavorites);
      toast.success("An item has been removed");
      handleClose();
    };
  };

  let dialog = (
    <div style={dialogStyles}>
      <button style={dialogCloseButtonStyles} onClick={handleClose}>x</button>
      <div className="text-light">
        {props.children}
      </div>
      {
        props.showButtons ? (
          <div className="container">
            <button className="btn btn-primary m-2" onClick={handleYes}>Yes</button>
            <button className="btn btn-danger" onClick={handleClose}>Cancel</button>
          </div>
        ) : (
          null
        )
      }
    </div>
  );

  if (!props.isOpenDialog) {
    dialog = null;
  };

  return (
    <div>
      {dialog}
    </div>
  );
};

export default Dialog;