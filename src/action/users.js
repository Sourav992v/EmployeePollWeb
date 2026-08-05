import * as types from "../components/types";
import { _getUsers } from "../../_DATA";

const receiveUsers = (users) => ({
    type: types.RECEIVE_USERS,
    payload: users,
});

export const fetchUsers = () => (dispatch) => {
    return _getUsers().then((users) => {
        dispatch(receiveUsers(users));
    });
};