import {
  UserActions,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  User,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  AUTO_LOGIN,
} from "./types";

// logIn
export const logIn = (email: string, password: string): UserActions => {
  return { type: LOG_IN, payload: { email, password } };
};

export const logInSuccess = (user: User): UserActions => {
  return { type: LOG_IN_SUCCESS, payload: user };
};

export const logInFailed = (): UserActions => {
  return { type: LOG_IN_FAILED };
};

// signUp
export const signUp = (user: User): UserActions => {
  return { type: SIGN_UP, payload: user };
};

export const signUpSuccess = (user: User): UserActions => {
  return { type: SIGN_UP_SUCCESS, payload: user };
};

export const signUpFailed = (): UserActions => {
  return { type: SIGN_UP_FAILED };
};

// logOut
export const logOut = (): UserActions => {
  return { type: LOG_OUT };
};

export const logOutSuccess = (): UserActions => {
  return { type: LOG_OUT_SUCCESS };
};

export const logOutFailed = (): UserActions => {
  return { type: LOG_OUT_FAILED };
};

// logOut
export const autoLogin = (user: User): UserActions => {
  return { type: AUTO_LOGIN, payload: user };
};
