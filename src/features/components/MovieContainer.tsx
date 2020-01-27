import React, { useEffect, useState } from "react";
import { match as Match } from "react-router-dom";
import { History } from "history";

import { MovieForm } from "../components/MovieForm";
import { getMovieById, Movie as CurrentMovie } from "../../api/movies";

export type Movie = {
  title: string;
  genre: string;
  numberInStock: number;
  dailyRentalRate: number;
};

type MovieContainer = {
  match: Match<{ id: string }>;
  history: History;
};

export const MovieContainner = ({ match, history }: MovieContainer) => {
  const [movie, setMovie] = useState(null as Movie | null);

  useEffect(() => {
    getMovieById(match.params.id).then(movie => {
      if (movie) {
        setMovie(makeMovieModel(movie));
      } else {
        history.push("/not-found");
      }
    });
  }, [match.params.id]);

  const makeMovieModel = (movie: CurrentMovie) => ({
    title: movie.title,
    genre: movie.genre.name,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate
  });

  return (
    <>
      {movie ? (
        <MovieForm
          currentMovie={movie}
          history={history}
          id={match.params.id}
        />
      ) : (
        <div>Loading </div>
      )}
    </>
  );
};
