import axios from "axios";
import keys from "./keys";
const instance = axios.create({
  baseURL: `https://ipfind.co/?ip=196.21.104.1&auth=${keys.LOCATION_KEY}`,
});

export default instance;
