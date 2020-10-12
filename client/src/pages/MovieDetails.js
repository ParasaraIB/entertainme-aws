import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import { FIND_MOVIE_BY_ID, FIND_ALL_MOVIES, EDIT_MOVIE, DELETE_MOVIE } from "../graphql/movies.js";
import Loading from "../components/Loading.js";
import { favorites } from "../config/client.js";
import { GET_FAVORITES } from "../graphql";
import Dialog from "../components/Dialog.js";

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);

  const { loading, error, data } = useQuery(FIND_MOVIE_BY_ID, {
    variables: { _id: id }
  });

  const { data: favoritesData } = useQuery(GET_FAVORITES, {
    refetchQueries: [{ query: GET_FAVORITES }]
  });

  const [ editMovie ] = useMutation(EDIT_MOVIE, {
    refetchQueries: [{ query: FIND_MOVIE_BY_ID, variables: { _id: id }}]
  });
  const [ deleteMovie ] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: FIND_ALL_MOVIES}]
  });

  const editedMovie = {};
  const [ title, setTitle ] = useState("");
  const [ overview, setOverview ] = useState("");
  const [ poster_path, setPoster_path] = useState("");
  const [ popularity, setPopularity ] = useState("");
  const [ tags, setTags ] = useState([]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleOverview = (e) => {
    setOverview(e.target.value);
  };
  const handlePoster_path = (e) => {
    setPoster_path(e.target.value);
  };
  const handlePopularity = (e) => {
    setPopularity(e.target.value);
  };
  const handleTags = (e) => {
    setTags(e.target.value);
  };

  const handleDelete = (e) => {
    deleteMovie({
      variables: { _id: id }
    });
    toast.success("A movie has been deleted");
    history.goBack();
  };

  const [ show, setShow ] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setTitle(data.findMovieById.title);
    setOverview(data.findMovieById.overview);
    setPoster_path(data.findMovieById.poster_path);
    setPopularity(data.findMovieById.popularity);
    setTags(data.findMovieById.tags.join(","));
    setShow(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (title !== "" && overview !== "" && poster_path !== "" && popularity !== "" && tags.length > 0) {
      editedMovie.title = title;
      editedMovie.overview = overview;
      editedMovie.poster_path = poster_path;
      editedMovie.popularity = +popularity;
      editedMovie.tags = tags.split(",").map((tag) => tag.trim());
  
      editMovie({
        variables: {
          _id: id,
          movie: editedMovie
        }
      });
      toast.success("A movie has been edited");
      setShow(false);
    } else {
      setIsOpenDialog(true);
    }
  };

  const handleAddFavorites = (e) => {
    favorites([...favorites(), data.findMovieById]);
    toast.success("Added to Favorites");
  };

  if (loading) {
    return <Loading />;
  };
  if (error) {
    return <p>{error}</p>;
  };
  return (
    <div className="row">
      <div className="col">
        <img 
          style={{ width: "300px", padding: "0 10 px 0 20 px" }}
          src={data.findMovieById.poster_path}
          alt={data.findMovieById._id}
        />
      </div>
      <div className="col text-left mr-3">
        <h3 className="border p-2">{data.findMovieById.title}</h3>
        <h6 className="border p-2">{data.findMovieById.overview}</h6>
        <h3 className="border p-2">{data.findMovieById.popularity}</h3>
        <h3 className="border p-2">
          {
            data.findMovieById.tags.map((tag) => {
              return (
                <button
                  className="btn btn-success m-1"
                  disabled
                  style={{ color: "white" }}
                  key={tag}
                >
                  {tag}
                </button>
              );
            })
          }
        </h3>
        <button
          className="btn btn-secondary m-2"
          onClick={() => history.goBack()}
        >
          Back
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={handleShow}
        >
          Edit
        </button>
        <button
          className="btn btn-danger m-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <div className="text-center">
          {
            favoritesData.favorites.find((favorite) => favorite._id === id) ? (
              <button
                className="btn btn-info m-2"
                disabled
              >
                Add to Favorites
              </button>
            ): (
              <button
              className="btn btn-info m-2"
              onClick={handleAddFavorites}
            >
              Add to Favorites
            </button>
            )
          }
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleEdit}>
            <div className="form-group">
              <label className="col-form-label">Title:</label>
              <input 
                type="text"
                className="form-control"
                onChange={handleTitle}
                value={title}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Overview:</label>
              <input 
                type="text"
                className="form-control"
                onChange={handleOverview}
                value={overview}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Poster Path:</label>
              <input 
                type="url"
                className="form-control"
                onChange={handlePoster_path}
                value={poster_path}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Popularity:</label>
              <input 
                type="number"
                step="0.01"
                className="form-control"
                onChange={handlePopularity}
                value={popularity}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Tags:</label>
              <input 
                type="text"
                className="form-control"
                onChange={handleTags}
                value={tags}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary m-2">
              Edit
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Dialog 
        isOpenDialog={isOpenDialog}
        onCloseDialog={(e) => setIsOpenDialog(false)}
      >
        Please fill all the field correctly!
      </Dialog>
    </div>
  );
}

export default MovieDetails;