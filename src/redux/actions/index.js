// export const fetchData = () => async (dispatch) => {
//   const response = await fetch("https://randomuser.me/api/");
//   if (!response.ok) {
//     throw Error("Could not fetch the data!");
//   }
//   const responseData = await response.json();
//   const newData = responseData?.results.map((itm) => ({
//     id: itm.login.uuid,
//     dob: itm.dob.date.slice(0, 10),
//     username: itm.login.username,
//     password: itm.login.password,
//     fname: itm.name.first,
//     lname: itm.name.last,
//     email: itm.email,
//     phone: itm.phone,
//     city: itm.location.city,
//     country: itm.location.country,
//     image: itm.picture.large,
//   }));
//   dispatch({
//     type: "FETCH",
//     payload: newData,
//   });
//   dispatch({ type: "LOADING", payload: false });
// };
export const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

export const inputChange = (data) => {
  return {
    type: "INPUT_CHANGE",
    payload: data,
  };
};
export const submit = (data) => {
  return {
    type: "SUBMIT",
    payload: data,
  };
};
export const edit = (data) => {
  return {
    type: "EDIT",
    payload: data,
  };
};
export const update = (data) => {
  return {
    type: "UPDATE",
    payload: data,
  };
};
export const deleteItem = (data) => {
  return {
    type: "DELETE",
    payload: data,
  };
};
export const clearForm = () => {
  return {
    type: "CLEAR_FORM",
  };
};
export const dataLoader = (data) => ({
  type: "LOADING",
  payload: data,
});
export const getUser = () => ({
  type: GET_USER,
});
export const setUser = (user) => ({
  type: SET_USER,
  user,
});
export const errors = (data) => ({
  type: "ERROR",
  payload: data,
});
