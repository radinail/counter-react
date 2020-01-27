import axios from "axios";
import { toast } from "react-toastify";

import { logger } from "./logger";

axios.interceptors.response.use(undefined, error => {
  const clientError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!clientError) {
    toast.error("An error occured please try again");
    logger.log(error);
  }

  return Promise.reject(error);
});

export const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete
};
