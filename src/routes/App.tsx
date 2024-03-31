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
import { HSThemeAppearance } from "../theme";
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

/**
 * Initializes the HSThemeAppearance module and sets up event listeners for changes in theme appearance.
 * - Listens for custom event 'on-hs-appearance-change' and updates switchable themes accordingly.
 * @returns None
 */
HSThemeAppearance.init();

window
  .matchMedia("(prefers-color-scheme: default)")
  .addEventListener("change", () => {
    if (HSThemeAppearance.getOriginalAppearance() === "auto") {
      HSThemeAppearance.setAppearance("auto", false);
    }
  });

window.addEventListener("load", () => {
  const $clickableThemes = document.querySelectorAll(
    "[data-hs-theme-click-value]"
  );
  const $switchableThemes = document.querySelectorAll("[data-hs-theme-switch]");

  $clickableThemes.forEach(($item) => {
    $item.addEventListener("click", () =>
      HSThemeAppearance.setAppearance(
        $item.getAttribute("data-hs-theme-click-value"),
        true,
        // @ts-ignore
        $item
      )
    );
  });

  $switchableThemes.forEach(($item) => {
    $item.addEventListener("change", (e) => {
      // @ts-ignore
      HSThemeAppearance.setAppearance(e.target.checked ? "dark" : "default");
    });
    // @ts-ignore
    $item.checked = HSThemeAppearance.getAppearance() === "dark";
  });

  window.addEventListener("on-hs-appearance-change", (e) => {
    $switchableThemes.forEach(($item) => {
      // @ts-ignore
      $item.checked = e.detail === "dark";
    });
  });
});

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
        className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        onClick={handleClick}
      >
        <span className="self-center">Sign Out</span>
      </button>
    );
  }
  return (
    <a
      className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      href="/login"
    >
      Login
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
        <div className="self-center">
          <header className="relative z-50 flex flex-wrap w-full py-4 text-sm bg-white border-b sm:justify-start sm:flex-nowrap dark:bg-gray-800">
            <nav
              className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
              aria-label="Global"
            >
              <div className="flex items-center justify-between">
                <a
                  className="flex-none text-xl font-semibold font-titlefont dark:text-white"
                  href="/"
                >
                  HPDB
                </a>
                <div className="sm:hidden font-notnormal">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm hs-collapse-toggle gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-collapse="#navbar-with-mega-menu"
                    aria-controls="navbar-with-mega-menu"
                    aria-label="Toggle navigation"
                  >
                    <svg
                      className="flex-shrink-0 hs-collapse-open:hidden size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <line x1="3" x2="21" y1="6" y2="6" />
                      <line x1="3" x2="21" y1="12" y2="12" />
                      <line x1="3" x2="21" y1="18" y2="18" />
                    </svg>
                    <svg
                      className="flex-shrink-0 hidden hs-collapse-open:block size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                id="navbar-with-mega-menu"
                className="hidden overflow-hidden transition-all duration-300 font-notnormal hs-collapse basis-full grow sm:block"
              >
                <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                  <Authed />
                  <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none]">
                    <button
                      id="hs-mega-menu-basic-dr"
                      type="button"
                      className="flex items-center w-full font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 "
                    >
                      Listings
                      <svg
                        className="flex-shrink-0 ms-1 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="listings/new"
                      >
                        New Listing
                      </a>

                      <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        to="listings/all"
                      >
                        All Listings
                      </Link>
                    </div>
                  </div>
                  <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none]">
                    <button
                      id="hs-mega-menu-basic-dr"
                      type="button"
                      className="flex items-center w-full font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 "
                    >
                      Products
                      <svg
                        className="flex-shrink-0 ms-1 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="products/new"
                      >
                        New Product
                      </a>

                      <Link
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        to="products/all"
                      >
                        All Products
                      </Link>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center font-medium text-gray-600 hs-dark-mode-active:hidden hs-dark-mode group hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500"
                    data-hs-theme-click-value="dark"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="items-center hidden font-medium text-gray-600 hs-dark-mode-active:block hs-dark-mode group hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500"
                    data-hs-theme-click-value="light"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 8a2 2 0 1 0 4 4" />
                      <path d="M12 2v2" />
                      <path d="M12 20v2" />
                      <path d="m4.93 4.93 1.41 1.41" />
                      <path d="m17.66 17.66 1.41 1.41" />
                      <path d="M2 12h2" />
                      <path d="M20 12h2" />
                      <path d="m6.34 17.66-1.41 1.41" />
                      <path d="m19.07 4.93-1.41 1.41" />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
          </header>
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
