import Home from "../pages/Home";
import Login from "../pages/Login";
import Prodform from "../pages/Prodform";
import Listform from "../pages/Listform";
import Allproducts from "../pages/Allproducts";
import Signup from "../pages/Signup";
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

/**
 * Renders a component based on the authentication status.
 * If a token is present, it renders a "Sign Out" button that triggers the handleClick function.
 * If no token is present, it renders a "Login" link that redirects to the login page.
 * @returns The rendered component.
 */
function Authed() {
  const token = getToken();
  if (token !== undefined) {
    return (
      <button className="mr-5" onClick={handleClick}>
        Sign Out
      </button>
    );
  }
  return (
    <div>
      <a className="mr-5" href="/login">
        Login
      </a>
      <a className="mr-5" href="/signup">
        Signup
      </a>
    </div>
  );
}

export default function App() {
  return (
    /**
     * Renders the main application component with the provided client as the context value.
     * The component includes a navigation bar with links to different pages, such as Home, Login,
     * Add Product, and Add Listing. The routes are defined using React Router and correspond to
     * different components that will be rendered based on the current URL path.
     * @param {Object} client - The client object to be used as the context value.
     * @returns The rendered application component.
     */
    <Provider value={client}>
      <Router>
        <div className="px-4 mx-auto max-w-8xl sm:px-6 md:px-8">
          <nav className="flex items-center pt-5 pb-3">
            <Link to="/">
              <span className="flex items-center mr-10">
                <div className="float-left">
                  <img src={logo} width={50} height={50} />
                </div>
                <p className="align-middle">HPDB</p>
              </span>
            </Link>
            <Authed />
            <a href="/addproduct" className="mr-5">
              New Product
            </a>
            <a href="/addlisting" className="mr-5">
              New Listing
            </a>
            <a href="/allproducts" className="mr-5">
              All Products
            </a>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addproduct" element={<Prodform />} />
            <Route path="/addlisting" element={<Listform />} />
            <Route path="/allproducts" element={<Allproducts />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
