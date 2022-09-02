import { applyMiddleware, createStore, compose } from "redux";
// import thunk from "redux-thunk";
import allReducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";

// const middleware = [thunk];
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export const store = createStore(
  allReducers,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(watcherSaga);
