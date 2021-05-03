import { takeLatest, delay, put, call } from "redux-saga/effects";

// types
import {
  LOG_IN,
  LogInAction,
  User,
  LOG_OUT,
  SIGN_UP,
  signUpAction,
} from "./types";

// actions
import * as userActions from "./actions";

// history
import history from "../../utils/history";

// api
import api from "../../api";

// logIn
function* logIn(action: LogInAction) {
  try {
    const { data } = yield call(() => {
      return api.post("api/users/signin", {
        email: action.payload.email,
        password: action.payload.password,
      });
    });

    const user: User = data.user;
    yield put(userActions.logInSuccess(user));
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, user: data.user })
    );
    history.push("/app/home");
  } catch (ex) {
    yield put(userActions.logInFailed());
  }
}

// signUp
function* signUp(action: signUpAction) {
  try {
    const { data } = yield call(() => {
      return api.post("api/users/signup", {
        ...action.payload,
        company: "company",
      });
    });

    const user: User = data.user;
    yield put(userActions.signUpSuccess(user));
    localStorage.setItem(
      "user",
      JSON.stringify({ token: data.token, user: data.user })
    );
    history.push("/app/home");
  } catch (ex) {
    yield put(userActions.signUpFailed());
  }
}

function* logOut() {
  try {
    yield put(userActions.logOutSuccess());
    localStorage.removeItem("user");
    history.push("/user/login");
  } catch (ex) {
    yield put(userActions.logOutFailed());
  }
}

export default function* userSagas() {
  yield takeLatest(LOG_IN, logIn);
  yield takeLatest(SIGN_UP, signUp);
  yield takeLatest(LOG_OUT, logOut);
}
