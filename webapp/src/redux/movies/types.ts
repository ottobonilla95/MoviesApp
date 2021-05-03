// GET_MOVIES
export const GET_MOVIES = "[MOVIE] GET_MOVIES";
export const GET_MOVIES_SUCCESS = "[MOVIE] GET_MOVIES_SUCCESS";
export const GET_MOVIES_FAILED = "[MOVIE] GET_MOVIES_FAILED";

// CREATE_MOVIE
export const CREATE_MOVIE = "[MOVIE] CREATE_MOVIE";
export const CREATE_MOVIE_SUCCESS = "[MOVIE] CREATE_MOVIE_SUCCESS";
export const CREATE_MOVIE_FAILED = "[MOVIE] CREATE_MOVIE_FAILED";

//  DELETE_MOVIE
export const DELETE_MOVIE = "[MOVIE] DELETE_MOVIE";
export const DELETE_MOVIE_SUCCESS = "[MOVIE] DELETE_MOVIE_SUCCESS";
export const DELETE_MOVIE_FAILED = "[MOVIE] DELETE_MOVIE_FAILED";

// interfaces
export interface Movie {
  id?: string;
  name: string;
  description: string;
  image: string;
  userId: string;
}
// state
export interface MovieState {
  movies: Movie[];
  loading: boolean;
}

// // // actions
// getMovies
interface getMovies {
  type: typeof GET_MOVIES;
}

interface getMoviesSuccess {
  type: typeof GET_MOVIES_SUCCESS;
  payload: Movie[];
}

interface getMoviesFailed {
  type: typeof GET_MOVIES_FAILED;
}
// createMovie
export interface createMovieAction {
  type: typeof CREATE_MOVIE;
  payload: { name: string; description: string; image: string };
}

interface createMovieSuccess {
  type: typeof CREATE_MOVIE_SUCCESS;
  payload: Movie;
}

interface createMovieFailed {
  type: typeof CREATE_MOVIE_FAILED;
}
// deleteMovie
export interface deleteMovieAction {
  type: typeof DELETE_MOVIE;
  payload: string;
}

interface deleteMovieSuccess {
  type: typeof DELETE_MOVIE_SUCCESS;
}

interface deleteMovieFailed {
  type: typeof DELETE_MOVIE_FAILED;
}

export type MovieActions =
  | getMovies
  | getMoviesSuccess
  | getMoviesFailed
  | createMovieAction
  | createMovieSuccess
  | createMovieFailed
  | deleteMovieAction
  | deleteMovieSuccess
  | deleteMovieFailed;
