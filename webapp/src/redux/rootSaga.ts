import { all } from "redux-saga/effects";

// sagas
import UserSagas from "./user/sagas";
import MoviesSagas from "./movies/sagas";

export default function* rootSaga() {
  yield all([UserSagas(), MoviesSagas()]);
}
