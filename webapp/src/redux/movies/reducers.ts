import {
  MovieActions,
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  MovieState,
  CREATE_MOVIE,
  CREATE_MOVIE_SUCCESS,
  CREATE_MOVIE_FAILED,
  DELETE_MOVIE,
  DELETE_MOVIE_SUCCESS,
  DELETE_MOVIE_FAILED,
} from "./types";

const initialState: MovieState = {
  movies: [],
  loading: false,
};

const MoviesReducer = (
  state = initialState,
  action: MovieActions
): MovieState => {
  switch (action.type) {
    case GET_MOVIES:
      return { ...state, loading: true };
    case GET_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, loading: false };
    case GET_MOVIES_FAILED:
      return { ...state, loading: false };

    case CREATE_MOVIE:
      return { ...state, loading: true };
    case CREATE_MOVIE_SUCCESS:
      return { ...state, loading: false };
    case CREATE_MOVIE_FAILED:
      return { ...state, loading: false };

    case DELETE_MOVIE:
      return { ...state, loading: true };
    case DELETE_MOVIE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_MOVIE_FAILED:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default MoviesReducer;
