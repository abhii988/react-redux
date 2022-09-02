import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import RouteSwitch from "./components/RouteSwitch";
import "bootstrap/dist/css/bootstrap.min.css";
import { errors, getUser } from "./redux/actions";

function App() {
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(errors(null));
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() => {
  //   dispatch(fetchData()).catch((err) => {
  //     setError(err.message);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return <div className="app">{<RouteSwitch></RouteSwitch>}</div>;
}

export default App;
