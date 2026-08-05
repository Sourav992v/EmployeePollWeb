import * as types from "../components/types";

export const setAuthedUser = (id) => ({
    type: types.SET_AUTHED_USER,
    payload: id,
});

export const logoutUser = () => ({
    type: types.LOGOUT_USER,
});