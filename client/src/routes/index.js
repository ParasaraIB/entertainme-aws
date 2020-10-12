import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home.js";
import Movies from "../pages/Movies.js";
import MovieDetails from "../pages/MovieDetails.js";
import TvSeries from "../pages/TvSeries.js";
import TvSeriesDetails from "../pages/TvSeriesDetails.js";
import Favorites from "../pages/Favorites.js";

const Routes = () => {
  return (
    <header className="App-header">
      <Switch>
        <Route path="/movies/:id" component={MovieDetails} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/movies" component={Movies} />
        <Route path="/tv/:id" component={TvSeriesDetails} />
        <Route path="/tv" component={TvSeries} />
        <Route exact path="/" component={Home} />
      </Switch>
    </header>
  )
}

export default Routes;