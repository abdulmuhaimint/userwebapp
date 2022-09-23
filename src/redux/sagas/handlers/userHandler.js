import { call, put } from "redux-saga/effects";

//actions
import { setUser } from "../../ducks/userSlice";

//api reuests
import { requestGetUser } from "../requests/user";

//handlers goes here
export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser);
    const { data } = response;
    yield put(setUser({ ...data }));
  } catch (error) {
    console.log(error);
  }
}
