import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import RouteSwitch from "./components/RouteSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchData } from "./redux/actions";

function App() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData()).catch((err) => {
      setError(err.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="app">
      {<RouteSwitch error={error} setError={setError}></RouteSwitch>}
    </div>
  );
}

export default App;
