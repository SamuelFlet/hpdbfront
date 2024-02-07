import Container from "react-bootstrap/Container";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Nav from "react-bootstrap/Nav";
import logo from "../img/Logo.svg";
import Navbar from "react-bootstrap/Navbar";
import Newlisting from "../pages/Newlisting";
import Newproduct from "../pages/Newproduct";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { getToken } from "../authStore";
import "../styles/App.css";

/**
 * Creates a new instance of the Client class with the specified configuration options.
 * @param {object} options - The configuration options for the client.
 * @param {string} options.url - The URL of the GraphQL server.
 * @param {function} options.fetchOptions - A function that returns the options to be passed to the fetch API.
 * @param {Array} options.exchanges - An array of exchange functions to be used by the client.
 */
const client = new Client({
  url: "https://hpdb.fly.dev/graphql",
  fetchOptions: () => {
    const token = getToken();
    if (token !== undefined) {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    } else {
      return {};
    }
  },
  exchanges: [cacheExchange, fetchExchange],
});

export default function App() {
  return (
    <Provider value={client}>
      <Router>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              HPDB
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/addproduct">New Product</Nav.Link>
            <Nav.Link href="/addlisting">New Listing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproduct" element={<Newproduct />} />
          <Route path="/addlisting" element={<Newlisting />} />
        </Routes>
      </Router>
    </Provider>
  );
}
