import axios from 'axios'
import { createSlice } from "@reduxjs/toolkit";
import loginSlice from './login-slice';

const registerSlice = createSlice({
    name: 'register',
    initialState: {},
    reducers: {
        registerRequest(state) {
            state.loading = true;
            state.error = null;
            state.userInfo = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload
            state.error = null;
        },
        registerFail(state, action) {
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState: {},
    reducers: {
        updateUserRequest(state) {
            state.loading = true;
            state.error = null;
            state.userInfo = null;
        },
        updateUserSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload
            state.error = null;
            state.success = true;
        },
        updateUserFail(state, action) {
            state.loading = false;
            state.error = action.payload
            state.success = false;
        }
    }
})

export const register = (name, email, password, pic) => async (dispatch) => {
    try {
        dispatch(registerSlice.actions.registerRequest())
        const { data } = await axios.post(
            '/api/users',
            { name, email, password, pic },
            {
                headers: {
                    "Content-type": "application/json"
                }
            })
        dispatch(registerSlice.actions.registerSuccess(data))
        dispatch(loginSlice.actions.loginSuccess(data))

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch(registerSlice.actions.registerFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}


export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch(updateUserSlice.actions.updateUserRequest());

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post("/api/users/profile", user, config);

        dispatch(updateUserSlice.actions.updateUserSuccess(data));

        dispatch(loginSlice.actions.loginSuccess(data));

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        dispatch(updateUserSlice.actions.updateUserFail(message));
    }
};


export const registerActions = registerSlice.actions;

export default registerSlice;