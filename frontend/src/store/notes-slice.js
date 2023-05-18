import axios from 'axios'
import { createSlice } from "@reduxjs/toolkit";

export const getnotesSlice = createSlice({
    name: 'getnotes',
    initialState: {},
    reducers: {
        noteslistRequest(state) {
            state.loading = true
            state.notes = null
            state.error = null
        },
        noteslistSuccess(state, action) {
            state.loading = false;
            state.notes = action.payload
            state.error = null
        },
        noteslistFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.notes = null
        }
    }
})

export const createnoteSlice = createSlice({
    name: 'createnote',
    initialState: {},
    reducers: {
        createnoteRequest(state) {
            state.loading = true
            state.success = null;
            state.error = null;
        },
        createnoteSuccess(state) {
            state.loading = false;
            state.success = true
            state.error = null;
        },
        createnoteFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.success = false
        }
    }
})


export const updatenoteSlice = createSlice({
    name: 'updatenote',
    initialState: {},
    reducers: {
        updatenoteRequest(state) {
            state.loading = true
            state.success = null;
            state.error = null;
        },
        updatenoteSuccess(state) {
            state.loading = false;
            state.success = true
            state.error = null;
        },
        updatenoteFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.success = false
        }
    }
})

export const deletenoteSlice = createSlice({
    name: 'deletenote',
    initialState: {},
    reducers: {
        deletenoteRequest(state) {
            state.loading = true
            state.success = null;
            state.error = null;
        },
        deletenoteSuccess(state) {
            state.loading = false;
            state.success = true
            state.error = null;
        },
        deletenoteFailed(state, action) {
            state.loading = false;
            state.error = action.payload
            state.success = false;
        }
    }
})


export const listNotes = () => async (dispatch, getState) => {
    try {
        dispatch(getnotesSlice.actions.noteslistRequest());

        const {
            login: { userInfo },
        } = getState();

        const { data } = await axios.get(`/api/notes`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        if (data.length <= 0) {
            throw new Error('No notes available')
        }
        dispatch(getnotesSlice.actions.noteslistSuccess(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(getnotesSlice.actions.noteslistFailed(message));
    }
};


export const createNote = (title, content, category) => async (dispatch, getState) => {
    try {
        dispatch(createnoteSlice.actions.createnoteRequest());

        const { login: { userInfo } } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.post(
            `/api/notes/create`,
            { title, content, category },
            config
        );
        dispatch(createnoteSlice.actions.createnoteSuccess());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(createnoteSlice.actions.createnoteFailed(message));
    }
};


export const updateNote = (id, title, content, category) => async (dispatch, getState) => {
    try {
        dispatch(updatenoteSlice.actions.updatenoteRequest());

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.put(
            `/api/notes/${id}`,
            { title, content, category },
            config
        );

        dispatch(updatenoteSlice.actions.updatenoteSuccess());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(updatenoteSlice.actions.updatenoteFailed(message));
    }
};


export const deleteNote = (id) => async (dispatch, getState) => {
    try {
        dispatch(deletenoteSlice.actions.deletenoteRequest());

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.delete(`/api/notes/${id}`, config);
        console.log(data)
        dispatch(deletenoteSlice.actions.deletenoteSuccess());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch(deletenoteSlice.actions.deletenoteFailed(message));
    }
};



