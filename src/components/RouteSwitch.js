import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import Nav from "./Nav";
import Shop from "./Shop";
import ItemDetail from "./ItemDetail";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Login from "./Login";
import { useState, useEffect } from "react";
import AddItem from "./AddItem";
import EditItem from "./EditItem";

const RouteSwitch = ({ error, setError }) => {
  // const [auth, setAuth] = useState(null);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("user")) ?? true
  );

  useEffect(() => {
    localStorage.setItem("user", auth);
  }, [auth]);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes auth={auth} />}>
          <Route
            element={
              <Nav
                Logout={() => {
                  setAuth(false);
                }}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/shop"
              element={<Shop error={error} setError={setError} />}
            />
            <Route path="/shop/:id" element={<ItemDetail />} />
            <Route path="/shop/add" element={<AddItem />} />
            <Route path="/shop/edit/:id" element={<EditItem />} />
            <Route
              path="/profile"
              element={
                <Profile
                  Logout={() => {
                    setAuth(false);
                  }}
                />
              }
            />
            <Route
              path="/profile/:user"
              element={
                <Profile
                  Logout={() => {
                    setAuth(false);
                  }}
                />
              }
            />
          </Route>
        </Route>
        <Route
          path="/login"
          element={<Login auth={auth} setAuth={setAuth} />}
        />
      </Routes>
    </Router>
  );
};
const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <hr />
      <h2>This is the home page!</h2>
    </div>
  );
};

export default RouteSwitch;
