import About from "../components/About";
import Home from "../components/Home";
import Login from "../pages/Login";
import Test from "../pages/Test";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { getToken } from "../authStore";

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
    if (token != undefined) {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    } else {
      return {
        
      };
    }
  },
  exchanges: [cacheExchange, fetchExchange],
});

export default function App() {
  return (
    <Provider value={client}>
      <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>
          <nav className="navbar navbar-expand-lg">
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
            <Route path="/contact" element={<Login />} />
            <Route path="/about" element={<Test />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
