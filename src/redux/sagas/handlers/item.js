import { call, put } from "redux-saga/effects";
import { dataLoader, errors, setUser } from "../../actions";
import { requestGetUser } from "../requests/item";

export function* handleGetUser() {
  try {
    const response = yield call(requestGetUser);
    const { data } = response;
    const newData = data?.results.map((itm) => ({
      id: itm.login.uuid,
      dob: itm.dob.date.slice(0, 10),
      username: itm.login.username,
      password: itm.login.password,
      fname: itm.name.first,
      lname: itm.name.last,
      email: itm.email,
      phone: itm.phone,
      city: itm.location.city,
      country: itm.location.country,
      image: itm.picture.large,
    }));
    yield put(setUser(newData));
  } catch (err) {
    let error = "";
    if (err.message === "Network Error") {
      error = "Oops! Unable to connect!";
    } else {
      error = "Error 404: No response from the server!";
    }
    yield put(errors(error));
    yield put(dataLoader(false));
  }
}
