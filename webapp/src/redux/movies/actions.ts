import {
  MovieActions,
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  Movie,
  CREATE_MOVIE,
  CREATE_MOVIE_SUCCESS,
  CREATE_MOVIE_FAILED,
  DELETE_MOVIE,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILED,
} from "./types";

// getMovies
export const getMovies = (): MovieActions => {
  return { type: GET_MOVIES };
};

export const getMoviesSuccess = (movies: Movie[]): MovieActions => {
  return { type: GET_MOVIES_SUCCESS, payload: movies };
};

export const getMoviesFailed = (): MovieActions => {
  return { type: GET_MOVIES_FAILED };
};

// createMovie
export const createMovie = (
  name: string,
  description: string,
  image: string
): MovieActions => {
  return { type: CREATE_MOVIE, payload: { name, description, image } };
};

export const createMovieSuccess = (movie: Movie): MovieActions => {
  return { type: CREATE_MOVIE_SUCCESS, payload: movie };
};

export const createMovieFailed = (): MovieActions => {
  return { type: CREATE_MOVIE_FAILED };
};

// deleteMovie
export const deleteMovie = (id: string): MovieActions => {
  return { type: DELETE_MOVIE, payload: id };
};

export const deleteMovieSuccess = (): MovieActions => {
  return { type: DELETE_MOVIE_SUCCESS };
};

export const deleteMovieFailed = (): MovieActions => {
  return { type: DELETE_MOVIE_FAILED };
};
