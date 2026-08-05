import * as types from "../components/types";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case types.SET_AUTHED_USER:
      return action.payload;
    case types.LOGOUT_USER:
      return null;
    default:
      return state;
  }
}