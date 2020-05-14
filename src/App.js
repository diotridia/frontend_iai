import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Book from "./components/Book";
import Navbar from "./layouts/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Book} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
