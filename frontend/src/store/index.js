import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './login-slice';
import { getnotesSlice, createnoteSlice, updatenoteSlice, deletenoteSlice } from './notes-slice';
import registerSlice, { updateUserSlice } from './register-slice';


const store = configureStore({
    reducer: {
        login: loginSlice.reducer,
        register: registerSlice.reducer,
        getnoteslist: getnotesSlice.reducer,
        createnote: createnoteSlice.reducer,
        noteupdate: updatenoteSlice.reducer,
        notedelete: deletenoteSlice.reducer,
        updateUser: updateUserSlice.reducer
    }
})

export default store;