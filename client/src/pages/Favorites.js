import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Card from "../components/Card.js";
import Loading from "../components/Loading.js";
import { GET_FAVORITES } from "../graphql";
import Dialog from "../components/Dialog.js";

const Favorites = () => {
  const [ isOpenDialogDelete, setIsOpenDialogDelete ] = useState(false);
  const [ favoriteId, setFavoriteId ] = useState("");

  const { loading, error, data } = useQuery(GET_FAVORITES, {
    refetchQueries: [{ query: GET_FAVORITES }]
  });

  if (loading) {
    return <Loading />;
  };
  if (error) {
    return <p>{error}</p>;
  };

  const deleteFavorites = (e, id) => {
    setFavoriteId(id);
    setIsOpenDialogDelete(true);
  };

  return (
    <div className="mt-3">
      <h3>Favorites</h3>
      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h5>Movies</h5>
        <div className="row justify-content-center m-2">
          {
            data.favorites.filter((favorite) => {
              return favorite.__typename === "Movie"
            }).map((favorite) => {
              return (
                <div key={favorite._id}>
                  <Card content={favorite} from={"movies"} />
                  <button className="btn btn-sm btn-danger" onClick={(e) => deleteFavorites(e, favorite._id)}>Delete</button>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h5>Tv Series</h5>
        <div className="row justify-content-center m-2">
          {
            data.favorites.filter((favorite) => {
              return favorite.__typename === "TvSeries"
            }).map((favorite) => {
              return (
                <div key={favorite._id}>
                  <Card content={favorite} from={"tv"} />
                  <button className="btn btn-sm btn-danger" onClick={(e) => deleteFavorites(e, favorite._id)}>Delete</button>
                </div>
              );
            })
          }
        </div>
      </div>
      <Dialog 
        isOpenDialog={isOpenDialogDelete}
        onCloseDialog={(e) => setIsOpenDialogDelete(false)}
        showButtons={true}
        deleteId={favoriteId}
        typename="favorites"
      >
        Proceed to delete?
      </Dialog>
    </div>
  );
}

export default Favorites;