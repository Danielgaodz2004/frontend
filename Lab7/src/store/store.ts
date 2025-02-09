import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import calculationsReducer from "./slices/calculationsSlice.ts"
import codesReducer from "./slices/codesSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        calculations: calculationsReducer,
        codes: codesReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;