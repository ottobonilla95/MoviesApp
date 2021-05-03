// LOG_IN
export const LOG_IN = "[USER] LOG_IN";
export const LOG_IN_SUCCESS = "[USER] LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "[USER] LOG_IN_FAILED";

// SIGN_UP
export const SIGN_UP = "[USER] SIGN_UP";
export const SIGN_UP_SUCCESS = "[USER] SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED = "[USER] SIGN_UP_FAILED";

// LOG_OUT
export const LOG_OUT = "[USER] LOG_OUT";
export const LOG_OUT_SUCCESS = "[USER] LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "[USER] LOG_OUT_FAILED";

// AUTO_LOGIN
export const AUTO_LOGIN = "[USER] AUTO_LOGIN";

// interfaces
export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}
// state
export interface UserState {
  user?: User;
  loading: boolean;
}

// // // actions
// LogIn
export interface LogInAction {
  type: typeof LOG_IN;
  payload: { email: string; password: string };
}

interface LogInSuccess {
  type: typeof LOG_IN_SUCCESS;
  payload: User;
}

interface LogInFailed {
  type: typeof LOG_IN_FAILED;
}

// signUp
export interface signUpAction {
  type: typeof SIGN_UP;
  payload: User;
}

interface signUpActionSuccess {
  type: typeof SIGN_UP_SUCCESS;
  payload: User;
}

interface signUpActionFailed {
  type: typeof SIGN_UP_FAILED;
}

// LogOut
interface LogOut {
  type: typeof LOG_OUT;
}

interface LogOutSuccess {
  type: typeof LOG_OUT_SUCCESS;
}

interface LogOutFailed {
  type: typeof LOG_OUT_FAILED;
}

// autoLogin
interface autoLogin {
  type: typeof AUTO_LOGIN;
  payload: User;
}

export type UserActions =
  | LogInAction
  | LogInSuccess
  | LogInFailed
  | signUpAction
  | signUpActionSuccess
  | signUpActionFailed
  | LogOut
  | LogOutSuccess
  | LogOutFailed
  | autoLogin;
