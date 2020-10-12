import React from "react";
import { useQuery } from "@apollo/client";

import Card from "../components/Card.js";
import Loading from "../components/Loading.js";
import { GET_FAVORITES } from "../graphql";

const Favorites = () => {
  const { loading, error, data } = useQuery(GET_FAVORITES);

  if (loading) {
    return <Loading />;
  };
  if (error) {
    return <p>{error}</p>;
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
                <Card key={favorite._id} content={favorite} from={"movies"} />
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
                <Card key={favorite._id} content={favorite} from={"tv"} />
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Favorites;