import { createStore, applyMiddleware } from "redux";
// saga
import createSagaMiddleware from "redux-saga";

// rootReducer
import rootReducer from "./rootReducer";

// rootsaga
import rootSaga from "./rootSaga";

// sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// middlewares
const middlewares = [sagaMiddleware];


export const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return store;
};
