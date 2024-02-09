import Home from "../pages/Home";
import Login from "../pages/Login";
import logo from "../img/Logo.svg";
import "../styles/App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { getToken, clearStorage } from "../authStore";

/**
 * Creates a new instance of the Client className with the specified configuration options.
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

const handleClick = () => clearStorage();

// function Authed() {
//   const token = getToken();
//   if (token !== undefined) {
//     return (
//       <Button onClick={handleClick} variant="outline-primary">
//         Sign Out
//       </Button>
//     );
//   }
//   return <Nav.Link href="/login">Login</Nav.Link>;
// }

export default function App() {
  return (
    <Provider value={client}>
      <Router>
        <div id="container">
          <nav className="flex items-center pt-5 pb-3">
            <Link to="/">
              <span className="flex items-center mr-10">
                <div className="float-left">
                  <img src={logo} width={50} height={50} />
                </div>
                <p className="align-middle">HPDB</p>
              </span>
            </Link>
            <Link to="/login" className="mr-5">
              Login
            </Link>
            <a href="#contact" className="mr-5">
              Contact
            </a>
            <a href="#about" className="mr-5">
              About
            </a>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="/addproduct" element={<Newproduct />} />
          <Route path="/addlisting" element={<Newlisting />} /> */}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
