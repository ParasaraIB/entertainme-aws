import React from "react";
import { useQuery } from "@apollo/client";

import Card from "../components/Card.js";
import { FIND_ALL } from "../graphql";
import Loading from "../components/Loading.js";

const Home = () => {
  const { loading, error, data } = useQuery(FIND_ALL);

  if (loading) {
    return <Loading />;
  };
  if (error) {
    return <p>{error}</p>;
  };

  return (
    <div className="mt-3">
      <h3>Entertain Me</h3>
      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h5>Movies</h5>
        <div className="row justify-content-center m-2">
          {
            data.findAllMovies.map((movie) => {
              return (
                <Card key={movie._id} content={movie} from={"movies"} />
              );
            })
          }
        </div>
      </div>

      <div className="row flex-column">
        <hr style={{ border: "1px solid white", width: "100vw" }} />
        <h5>Tv Series</h5>
        <div className="row justify-content-center m-2">
          {data.findAllTvSeries.map((tv) => {
            return <Card key={tv._id} content={tv} from={"tv"} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;