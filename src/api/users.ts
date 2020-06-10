import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { http } from "../services/http";
import { logger } from "../services/logger";
import config from "../config.json";

export type User = {
  email: string;
  password: string;
  name: string;
};

export const register = async (user: User) => {
  try {
    const response: AxiosResponse<User> = await http.post(
      `${config.apiEndpoint}/users`,
      user
    );
    localStorage.setItem("token", response.headers["x-auth-token"]);
    toast("Registration succedded");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data);
      logger.log(error);
      throw(new Error(error.response.data))
    }
  }
};

export type Login = {
  email: string;
  password: string;
};

export const login = async (credentials: Login) => {
  try {
    const response: AxiosResponse<string> = await http.post(
      `${config.apiEndpoint}/auth`,
      credentials
    );
    const storage = localStorage;
    storage.setItem("token", response.data);
    toast("Login succedded");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data);
      logger.log(error);
    }

    return null;
  }
};
