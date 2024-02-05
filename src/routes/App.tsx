import About from "../components/About";
import Home from "../components/Home";
import Login from "../pages/Login";
import Test from "../pages/Test";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { cacheExchange, Client, fetchExchange, Provider } from "urql";
import { getToken } from "../authStore";

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
