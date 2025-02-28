import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    language: "ru",
}

const languageSlice = createSlice({
    name: 'language',
    initialState: initialState,
    reducers: {
        saveLanguage: (state, action) => {
            state.language = action.payload
        },
    },
})

export const { saveLanguage } = languageSlice.actions;

export default languageSlice.reducer