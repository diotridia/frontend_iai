import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Book from "./components/Book";
import Pagelaran from "./components/Pagelaran";
import Navbar from "./layouts/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/Book" component={Book} />
            <Route path="/Pagelaran" component={Pagelaran} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
