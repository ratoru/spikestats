import axios from "axios";
import { errorToast } from "../util/swals";
import { apiUrl } from "../../app-config.json";

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

axios.defaults.baseURL = apiUrl;

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
