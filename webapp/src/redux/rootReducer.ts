import { combineReducers } from "redux";

// reducers
import UserReducer from "./user/reducers";
import MoviesReducer from "./movies/reducers";

const rootReducer = combineReducers({
  user: UserReducer,
  movies: MoviesReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
