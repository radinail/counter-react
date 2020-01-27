import React, { useState, useEffect, useContext } from "react";
import Joi from "joi";
import { History } from "history";
import _ from "lodash";

import { getGenres, Genre } from "../../api/genres";
import { validate, validateProperty } from "../utils/validate";
import { Input } from "../components/input";
import { addMovie, updateMovie } from "./../../api/movies";
import { Movie } from "./MovieContainer";
import { UserContext } from "../../context/user";

type Error = {
  title: string;
  genre: string;
  numberInStock: string;
  dailyRentalRate: string;
};

type Field = keyof Movie;

type MovieFormProps = {
  history: History;
  currentMovie?: Movie;
  id?: string;
};

const initialMovie = {
  title: "",
  genre: "",
  numberInStock: 0,
  dailyRentalRate: 0
};

export const MovieForm = ({
  history,
  currentMovie = initialMovie,
  id
}: MovieFormProps) => {
  const [movie, setMovie] = useState(currentMovie);
  const [errors, setErrors] = useState(
    !id
      ? {
          title: "",
          genre: "",
          numberInStock: "",
          dailyRentalRate: ""
        }
      : ({} as Error)
  );
  const [genres, setGenres] = useState([] as Genre[]);
  const [isLading, setIsLoading] = useState(false);

  const userContext = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getGenres().then(genres => {
      if (genres) setGenres(genres);
      else {
        history.push("/movies");
      }
      setIsLoading(false);
    });
  }, []);

  const schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validate<Movie, Error>(movie, schema);
    setErrors(error);
    const genre = genres.find(g => g.name === movie.genre);

    delete movie.genre;

    if (genre) {
      const newMovie = {
        ...movie,
        genreId: genre._id
      };

      if (id) {
        updateMovie(newMovie, id).then(() => history.push("/movies"));
      } else {
        addMovie(newMovie).then(() => {
          history.push("/movies");
        });
      }
    }
  };

  const handleChange = (field: Field, value: string | number) => {
    const newMovie = { ...movie } as any;
    newMovie[field] = value;
    setMovie(newMovie);
    const error = validateProperty(field, newMovie, schema);
    if (error) setErrors({ ...errors, [field]: error.details[0].message });
    if (!error) {
      delete errors[field];
    }
  };

  return (
    <>
      {!isLading ? (
        <>
          <h1>Movie Form</h1>
          <form
            style={{ width: "500px", marginLeft: "20px" }}
            onSubmit={handleSubmit}
          >
            <Input
              value={movie.title}
              handleChange={handleChange}
              label="Title"
              name="title"
              error={errors.title}
            />

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <select
                className="form-control"
                id="genre"
                value={movie.genre}
                onChange={e => {
                  handleChange("genre", e.target.value);
                }}
              >
                <option selected></option>
                {genres.map(g => (
                  <option key={g._id}>{g.name}</option>
                ))}
              </select>
              {errors.genre && (
                <div className="alert alert-danger">{errors.genre}</div>
              )}
            </div>

            <Input
              value={movie.numberInStock}
              handleChange={handleChange}
              label="Number in stock"
              name="numberInStock"
              error={errors.numberInStock}
            />

            <Input
              value={movie.dailyRentalRate}
              handleChange={handleChange}
              label="Rate"
              name="dailyRentalRate"
              error={errors.dailyRentalRate}
            />

            <button
              className="btn btn-primary"
              disabled={Object.keys(errors).length !== 0}
            >
              Save
            </button>
          </form>
        </>
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};
