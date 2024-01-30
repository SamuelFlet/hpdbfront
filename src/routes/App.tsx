import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";

const client = new Client({
  url: "https://hpdb.fly.dev/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

class App extends Component {
  render() {
    return (
      <Provider value={client}>
        <Router>
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li>
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/contact"} className="nav-link">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to={"/about"} className="nav-link">
                    About
                  </Link>
                </li>
              </ul>
            </nav>
            <hr />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
