import axios from "axios";
import { errorToast } from "../util/swals";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    errorToast.fire();
  }
  return Promise.reject(error);
});

const server = process.env.SERVER;

axios.defaults.baseURL = `${server}/api`;
// Send cookies on each request.
axios.defaults.withCredentials = true;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
