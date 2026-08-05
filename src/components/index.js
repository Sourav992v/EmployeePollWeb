import { combineReducers } from "redux";
import users from "../action/users";
import questions from "../action/questions";
import authedUser from "../action/authedUser";

export default combineReducers({
  users,
  questions,
  authedUser,
});