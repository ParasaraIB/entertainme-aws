import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import Card from "../components/Card.js";
import Loading from "../components/Loading.js";
import { FIND_ALL_TVSERIES, ADD_TVSERIES } from "../graphql/tvSeries.js";
import Dialog from "../components/Dialog.js";

const TvSeries = () => {
  const [ show, setShow ] = useState(false);
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);

  const { loading, error, data } = useQuery(FIND_ALL_TVSERIES);

  const [ addTvSeries, { data: mutationData ,called } ] = useMutation(ADD_TVSERIES, {
    refetchQueries: [{ query: FIND_ALL_TVSERIES }]
  });

  useEffect(() => {
    if (called && mutationData) {
      setTitle("");
      setOverview("");
      setPoster_path("");
      setPopularity("");
      setTags([]);
      setShow(false);
    }
  }, [called, mutationData]);

  const newTvSeries = {};
  const [ title, setTitle ] = useState("");
  const [ overview, setOverview ] = useState("");
  const [ poster_path, setPoster_path] = useState("");
  const [ popularity, setPopularity ] = useState("");
  const [ tags, setTags ] = useState([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== "" && overview !== "" && poster_path !== "" && popularity !== "" && tags.length > 0) {
      newTvSeries.title = title;
      newTvSeries.overview = overview;
      newTvSeries.poster_path = poster_path;
      newTvSeries.popularity = +popularity;
      newTvSeries.tags = tags.split(",").map((tag) => tag.trim());
  
      addTvSeries({
        variables: {
          tvSeries: newTvSeries
        }
      });
  
      toast.success("A new tv series has been added");
    } else {
      setIsOpenDialog(true);
    }
  };
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

  if (loading) {
    return <Loading />;
  };
  if (error) {
    return <p>{error}</p>;
  };

  return (
    <div>
      <h3 className="mt-3">Tv Series</h3>
      <button 
        className="btn btn-primary m-2 mb-3"
        onClick={handleShow}
      >
        + Tv Series
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Tv Series</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
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
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="card-columns">
        {
          data.findAllTvSeries.map((tvSeries) => {
            return (
              <Card 
                key={tvSeries._id}
                content={tvSeries}
                from={"tv"}
              />
            );
          })
        }
      </div>
      <Dialog 
        isOpenDialog={isOpenDialog}
        onCloseDialog={(e) => setIsOpenDialog(false)}
      >
        Please fill all the field correctly!
      </Dialog>
    </div>
  );
}

export default TvSeries;