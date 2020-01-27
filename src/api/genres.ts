import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { http } from "../services/http";
import config from "../config.json";
import { logger } from "../services/logger";

export type Genre = {
  _id: string;
  name: string;
};

export const getGenres = async () => {
  try {
    const genres: AxiosResponse<Genre[]> = await http.get(
      `${config.apiEndpoint}/genres`
    );
    return genres.data;
  } catch (error) {
    logger.log(error);
    toast.error("An error occured when getting genres please try later");
    return null;
  }
};
