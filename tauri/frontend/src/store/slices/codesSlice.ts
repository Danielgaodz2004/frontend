import {createSlice} from "@reduxjs/toolkit";

type T_CodesSlice = {
    code_name: string
}

const initialState:T_CodesSlice = {
    code_name: "",
}


const codesSlice = createSlice({
    name: 'codes',
    initialState: initialState,
    reducers: {
        updateCodeName: (state, action) => {
            state.code_name = action.payload
        }
    }
})

export const { updateCodeName} = codesSlice.actions;

export default codesSlice.reducer