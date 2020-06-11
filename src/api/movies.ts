import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { http } from "../services/http";
import { logger } from "../services/logger";
import { Genre } from "./genres";

const configAuth = {
  headers: {
    "x-auth-token": localStorage.getItem("token")
  }
};

export type NewMovie = {
  title: string;
  genreId: string;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
};

export type Movie = {
  _id: string;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
};

export const getMovies = async () => {
  try {
    const moviesList: AxiosResponse<Movie[]> = await http.get(
      `${process.env.API_ENDPOINT}/movies`
    );
    return moviesList.data;
  } catch (error) {
    if (error.response) {
      logger.log(error);
      toast.error("An error occured please try later");
      return null;
    }
  }
};

export const addMovie = async (movie: NewMovie) => {
  try {
    const newMovie: AxiosResponse<Movie> = await http.post(
      `${process.env.API_ENDPOINT}/movies`,
      movie
    );
    toast("Your movie has been added ");
    return newMovie.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("An error occured when adding movie please try later");
      logger.log(error);
    }
  }
};

export const deleteMovie = async (id: string) => {
  try {
    await http.delete(`${process.env.API_ENDPOINT}/movies/${id}`, configAuth);
    toast("Your movie has been deleted");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("The movie with the given ID was not found.");
      logger.log(error);
    }
  }
};

export const getMovieById = async (id: string) => {
  try {
    const movie: AxiosResponse<Movie> = await http.get(
      `${process.env.API_ENDPOINT}/movies/${id}`
    );
    return movie.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("The movie with the given ID was not found.");
      logger.log(error);
    }
  }
};

export const updateMovie = async (movie: NewMovie, id: string) => {
  try {
    const updatedMovie: AxiosResponse<Movie> = await http.put(
      `${process.env.API_ENDPOINT}/movies/${id}`,
      movie,
      configAuth
    );
    toast("Your movie has been updated");
    return updatedMovie.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("The movie with the given ID was not found.");
    }
    toast.error("An error occured when updating the movie please try again");
    logger.log(error);
    return null;
  }
};

export const getMoviesByGenre = (
  listOfMovies: Movie[] | null,
  nameOfGenres: string
) => {
  if (!nameOfGenres || !listOfMovies) return null;
  return listOfMovies.filter(movie => movie.genre.name === nameOfGenres);
};
