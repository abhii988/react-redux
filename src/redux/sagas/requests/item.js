import axios from "axios";

export function requestGetUser() {
  return axios.get("https://randomuser.me/api");
}
