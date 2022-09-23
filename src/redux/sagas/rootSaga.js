import { takeLatest } from "redux-saga/effects";

//handlers goes here
import { handleGetUser } from "./handlers/user";

//actions to watch
import { getUser } from "../ducks/userSlice";

export function* watcherSaga() {
  //watch each action here
  yield takeLatest(getUser.type, handleGetUser);
}
