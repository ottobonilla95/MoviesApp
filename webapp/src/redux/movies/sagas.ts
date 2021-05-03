import { takeLatest, put, call } from "redux-saga/effects";

// types
import {
  createMovieAction,
  deleteMovieAction,
  CREATE_MOVIE,
  DELETE_MOVIE,
  GET_MOVIES,
  Movie,
} from "./types";

// actions
import * as moviesActions from "./actions";

// api
import api from "../../api";

// getMovies
function* getMovies() {
  try {
    const { data } = yield call(() => {
      return api.get("api/movies/all");
    });

    yield put(moviesActions.getMoviesSuccess(data.movies));
  } catch (ex) {
    yield put(moviesActions.getMoviesFailed());
  }
}

// createMovie
function* createMovie(action: createMovieAction) {
  try {
    const { data } = yield call(() => {
      return api.post("api/movies", {
        ...action.payload,
      });
    });

    console.log(data);

    yield put(moviesActions.getMovies());
  } catch (ex) {
    yield put(moviesActions.createMovieFailed());
  }
}

// deleteMovie
function* deleteMovie(action: deleteMovieAction) {
  try {
    yield call(() => {
      return api.delete(`api/movies/${action.payload}`);
    });

    yield put(moviesActions.getMovies());
  } catch (ex) {
    yield put(moviesActions.deleteMovieFailed());
  }
}

export default function* moviesSagas() {
  yield takeLatest(GET_MOVIES, getMovies);
  yield takeLatest(CREATE_MOVIE, createMovie);
  yield takeLatest(DELETE_MOVIE, deleteMovie);
}
