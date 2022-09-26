import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "./sagas/rootSaga";
import usersReducer from "./slices/usersSlice";
import currentUserReducer from "./slices/currentUserSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  users: usersReducer,
  currentUser: currentUserReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(watcherSaga);

export default store;
