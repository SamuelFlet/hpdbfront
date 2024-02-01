import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { cacheExchange, Client, fetchExchange, Provider } from 'urql';

import About from '../components/About';
import Home from '../components/Home';
import Login from '../pages/Login';

const getToken = () => {
  return localStorage.getItem("TOKEN_KEY");
};

const client = new Client({
  url: "https://hpdb.fly.dev/graphql",
  fetchOptions: () => {
    const token = getToken();
    if (token != null) {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    } else {
      return {
        headers: { Authorization: `empty` },
      };
    }
  },
  exchanges: [cacheExchange, fetchExchange],
});

class App {
  render() {
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
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
