import axios from "axios";
const instance = axios.create({
  baseURL: "https://us-central1-clone-d4f05.cloudfunctions.net/api", //api cloud function URL
});
export default instance;
