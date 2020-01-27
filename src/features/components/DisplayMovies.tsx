import React from "react";
import Like from "./Like";
import { Movie } from "../../api/movies";
import { Link } from "react-router-dom";

type DisplayMoviesProps = {
  length: number;
  movies: Movie[];
  onDelete: (id: string) => void;
  onSort: (path: string) => void;
};

export const DisplayMovies = ({
  length,
  movies,
  onDelete,
  onSort
}: DisplayMoviesProps) => (
  <React.Fragment>
    <span>Showing {length} movies in the database</span>
    <table className="table">
      <thead>
        <tr>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSort("title")}
          >
            Title
          </th>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSort("genre.name")}
          >
            Genres
          </th>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSort("numberInStock")}
          >
            Stock
          </th>
          <th
            scope="col"
            style={{ cursor: "pointer" }}
            onClick={() => onSort("dailyRentalRate")}
          >
            Rate
          </th>
        </tr>
      </thead>
      <tbody>
        {movies &&
          movies.map(movie => (
            <tr key={movie._id}>
              <td>
                <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
              </td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like />
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </React.Fragment>
);
