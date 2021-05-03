import {
  UserActions,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  AUTO_LOGIN,
  UserState,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
} from "./types";

const initialState: UserState = {
  user: undefined,
  loading: false,
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loading: true };
    case LOG_IN_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOG_IN_FAILED:
      return { ...state, loading: false };

    case SIGN_UP:
      return { ...state, loading: true };
    case SIGN_UP_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case SIGN_UP_FAILED:
      return { ...state, loading: false };
    case LOG_OUT:
      return { ...state, loading: true };
    case LOG_OUT_SUCCESS:
      return { ...state, user: undefined, loading: false };
    case LOG_OUT_FAILED:
      return { ...state, loading: false };
    case AUTO_LOGIN:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export default UserReducer;
