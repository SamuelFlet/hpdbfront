import Allproducts from "../components/products/productFeed";
import Home from "../pages/Home";
import Listform from "../components/listings/listForm";
import ListingDetail from "../components/listings/listingDetail";
import Listingfeed from "../components/listings/listingFeed";
import Login from "../pages/Login";
import ProdDetail from "../components/products/productDetail";
import Prodform from "../components/products/productForm";
import Prodpage from "../pages/productPage";
import Signup from "../pages/Signup";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { clearStorage, getToken } from "../authStore";
import "../styles/App.css";

/**
 * Creates a new instance of the Client className with the specified configuration options.
 * @param {object} options - The configuration options for the client.
 * @param {string} options.url - The URL of the GraphQL server.
 * @param {function} options.fetchOptions - A function that returns the options to be passed to the fetch API.
 * @param {Array} options.exchanges - An array of exchange functions to be used by the client.
 */
const client = new Client({
  url: import.meta.env.VITE_DEV_URL,
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

const handleClick = () => {
  clearStorage();
  window.location.reload();
};

// function themeChange() {
//   const element = document.getElementById("main");
//   if (element?.classList.contains("theme-light")) {
//     element.classList.remove("theme-light");
//     element.classList.add("theme-dark");
//   } else if (element?.classList.contains("theme-dark")) {
//     element.classList.remove("theme-dark");
//     element.classList.add("theme-light");
//   }
// }

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
      <button
        className="flex px-2 border-l-2 nav-children"
        onClick={handleClick}
      >
        <span className="self-center">Sign Out</span>
      </button>
    );
  }
  return (
    <a className="flex px-2 border-l-2 nav-children" href="/login">
      <span className="self-center">Login</span>
    </a>
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
        <div className="self-center my-2">
          <div className="grid justify-center text-center">
            <Link id="logo" to="/">
              <p className="tracking-widest font-notnormal">
                I WILL THINK OF A MOTTO LATER
              </p>
              <p className="text-[8rem] font-titlefont">HPDB</p>
            </Link>
          </div>
          <nav
            id="navbar"
            className="flex justify-center h-16 font-notnormal border-y-2"
          >
            <Authed />
            <a
              href="/products/new"
              className="flex px-2 border-l-2 nav-children"
            >
              <span className="self-center ">New Product</span>
            </a>
            <a
              href="/listings/new"
              className="flex px-2 border-l-2 nav-children"
            >
              <span className="self-center">New Listing</span>
            </a>
            <Link
              to="/products/all"
              className="flex px-2 border-l-2 nav-children"
            >
              <span className="self-center">All Products</span>
            </Link>
            <Link
              to="/listings/all"
              className="flex px-2 border-x-2 nav-children"
            >
              <span className="self-center">All Listings</span>
            </Link>
            {/* <button
              className="flex px-2 border-black border-x-2"
              onClick={themeChange}
            >
              <span className="self-center">Change Theme</span>
            </button> */}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listings" element={<Prodpage />}>
              <Route path=":listingid" element={<ListingDetail />} />
              <Route path="new" element={<Listform />} />
              <Route path="all" element={<Listingfeed />} />
            </Route>
            <Route path="/products" element={<Prodpage />}>
              <Route path=":prodid" element={<ProdDetail />} />
              <Route path="new" element={<Prodform />} />
              <Route path="all" element={<Allproducts />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
