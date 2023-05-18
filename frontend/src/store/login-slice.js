import axios from 'axios'
import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const loginSlice = createSlice({
    name: 'login',
    initialState: { userInfo: userInfoFromStorage },
    reducers: {
        loginRequest(state) {
            state.loading = true;
            state.error = null;
            state.userInfo = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload
            state.error = null;
        },
        loginFail(state, action) {
            state.loading = false;
            state.error = action.payload
        },
        logout(state) {
            state.userInfo = null;
        }
    }
})

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginSlice.actions.loginRequest());

        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );

        dispatch(loginSlice.actions.loginSuccess(data));

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch(loginSlice.actions.loginFail(error.response && error.response.data.message ? error.response.data.message : error.message));
    }
};


export const logout = () => (dispatch) => {
    dispatch(loginSlice.actions.logout())
    localStorage.removeItem('userInfo');
}

export const loginActions = loginSlice.actions;

export default loginSlice;