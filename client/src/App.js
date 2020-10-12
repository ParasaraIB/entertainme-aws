import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { ApolloProvider } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css';
import client from "./config/client.js";
import Navbar from "./components/Navbar.js";

function App() {
  toast.configure();

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
