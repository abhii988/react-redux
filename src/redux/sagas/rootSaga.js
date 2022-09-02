import { takeLatest } from "redux-saga/effects";
import { handleGetUser } from "./handlers/item";
import { GET_USER } from "../actions";
// import { getUser } from "../actions";

export function* watcherSaga() {
  yield takeLatest(GET_USER, handleGetUser);
}
