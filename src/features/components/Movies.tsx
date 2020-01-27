import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import { History } from "history";
import Pagination from "./Pagination";
import { paginate } from "../utils/pagination";
import { ListGroups } from "./ListGroups";
import { DisplayMovies } from "./DisplayMovies";
import { Input } from "../components/input";
import {
  getMovies,
  Movie,
  deleteMovie,
  getMoviesByGenre
} from "../../api/movies";
import { getGenres, Genre } from "../../api/genres";
import { UserContext } from "../../context/user";
import { User } from "./../../context/user";

type MoviesProps = {
  history: History;
};

export const Movies = ({ history }: MoviesProps) => {
  const [movies, setMovies] = useState(null as Movie[] | null);
  const [size, setSize] = useState(4);
  const [page, setPage] = useState(1);
  const [nameOfGenre, setNameOfGenre] = useState("All Genres");
  const [sort, setSort] = useState({
    path: "title",
    order: "asc" as "asc" | "desc"
  });
  const [searchPrefix, setSearchPrefix] = useState("");
  const [genres, setGenres] = useState(null as Genre[] | null);

  useEffect(() => {
    getMovies().then(moviesList => {
      if (moviesList) setMovies(moviesList);
    });
  }, []);

  useEffect(() => {
    getGenres().then(genres => {
      if (genres) setGenres(genres);
    });
  }, []);

  const handleDelete = async (id: string) => {
    await deleteMovie(id);
    const movies = await getMovies();
    if (movies) setMovies(movies);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleGenreChange = (nameOfGenre: string) => {
    setNameOfGenre(nameOfGenre);
    setPage(1);
    setSearchPrefix("");
  };

  const handleSort = (path: string) => {
    sort.order === "asc"
      ? setSort({ path, order: "desc" })
      : setSort({ path, order: "asc" });
  };

  const handleSearch = (name: string, value: string) => {
    setSearchPrefix(value);
    setNameOfGenre("All Genres");
    setPage(1);
  };

  const searchMovie = (movies: Movie[] | null, searchPrefix: string) => {
    if (movies) {
      return movies.filter(m => {
        return m.title.toLowerCase().startsWith(searchPrefix.toLowerCase());
      });
    } else {
      return null;
    }
  };

  const moviesByGenres =
    nameOfGenre !== "All Genres"
      ? getMoviesByGenre(movies, nameOfGenre)
      : movies;

  const filtredMovie = searchMovie(movies, searchPrefix);

  const moviesToDisplay = searchPrefix ? filtredMovie : moviesByGenres;

  const sortedMovies = _.orderBy(moviesToDisplay, [sort.path], [sort.order]);

  const newMoviesPage = paginate<Movie>(sortedMovies, size, page);

  return (
    <>
      {movies ? (
        <div>
          {/*userContext.user && (
            <button
              className="btn btn-primary"
              onClick={() => history.push("/movies/new")}
            >
              New Movie
            </button>
          )*/}
          <button
            className="btn btn-primary"
            onClick={() => history.push("/movies/new")}
          >
            New Movie
          </button>
          <Input
            value={searchPrefix}
            handleChange={handleSearch}
            label="Search"
            name="search"
          />
          {moviesToDisplay && moviesToDisplay.length > 0 ? (
            <React.Fragment>
              {genres && (
                <ListGroups
                  onGenresChange={handleGenreChange}
                  nameOfGenre={nameOfGenre}
                  valueProperty="name"
                  listGenres={genres}
                />
              )}
              {newMoviesPage && (
                <DisplayMovies
                  length={moviesToDisplay.length}
                  movies={newMoviesPage}
                  onDelete={handleDelete}
                  onSort={handleSort}
                />
              )}
              {moviesToDisplay && (
                <Pagination
                  numberOfPages={moviesToDisplay.length / size}
                  onPageChange={handlePageChange}
                  actualPage={page}
                />
              )}
            </React.Fragment>
          ) : (
            "There is no movies in the database"
          )}
        </div>
      ) : null}
    </>
  );
};

export default Movies;
