import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

import { FIND_TVSERIES_BY_ID, EDIT_TVSERIES } from "../graphql/tvSeries.js";
import Loading from "../components/Loading.js";
import { favorites } from "../config/client.js";
import { GET_FAVORITES } from "../graphql";
import Dialog from "../components/Dialog.js";

const TvSeriesDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ isOpenDialogDelete, setIsOpenDialogDelete ] = useState(false);

  const { loading, error, data } = useQuery(FIND_TVSERIES_BY_ID, {
    variables: { _id: id }
  });

  const { data: favoritesData } = useQuery(GET_FAVORITES, {
    refetchQueries: [{ query: GET_FAVORITES }]
  });

  const [ editTvSeries ] = useMutation(EDIT_TVSERIES, {
    refetchQueries: [{ query: FIND_TVSERIES_BY_ID, variables: { _id: id }}]
  });

  const editedTvSeries = {};
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
    setIsOpenDialogDelete(true);
  };

  const [ show, setShow ] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setTitle(data.findTvSeriesById.title);
    setOverview(data.findTvSeriesById.overview);
    setPoster_path(data.findTvSeriesById.poster_path);
    setPopularity(data.findTvSeriesById.popularity);
    setTags(data.findTvSeriesById.tags.join(","));
    setShow(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (title !== "" && overview !== "" && poster_path !== "" && popularity !== "" && tags.length > 0) {
      editedTvSeries.title = title;
      editedTvSeries.overview = overview;
      editedTvSeries.poster_path = poster_path;
      editedTvSeries.popularity = +popularity;
      editedTvSeries.tags = tags.split(",").map((tag) => tag.trim());
  
      editTvSeries({
        variables: {
          _id: id,
          tvSeries: editedTvSeries
        }
      });
      toast.success("A tv series has been edited");
      setShow(false);
    } else {
      setIsOpenDialog(true);
    }
  };

  const handleAddFavorites = (e) => {
    favorites([...favorites(), data.findTvSeriesById]);
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
          src={data.findTvSeriesById.poster_path}
          alt={data.findTvSeriesById._id}
        />
      </div>
      <div className="col text-left mr-3">
        <h3 className="border p-2">{data.findTvSeriesById.title}</h3>
        <h6 className="border p-2">{data.findTvSeriesById.overview}</h6>
        <h3 className="border p-2">{data.findTvSeriesById.popularity}</h3>
        <h3 className="border p-2">
          {
            data.findTvSeriesById.tags.map((tag) => {
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
          <Modal.Title>Edit Tv Series</Modal.Title>
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
        isOpenDialog={isOpenDialogDelete}
        onCloseDialog={(e) => setIsOpenDialogDelete(false)}
        showButtons={true}
        deleteData={data}
        typename={data.findTvSeriesById.__typename}
      >
        Proceed to delete?
      </Dialog>
      <Dialog 
        isOpenDialog={isOpenDialog}
        onCloseDialog={(e) => setIsOpenDialog(false)}
        showButtons={false}
      >
        Please fill all the field correctly!
      </Dialog>
    </div>
  );
}

export default TvSeriesDetails;