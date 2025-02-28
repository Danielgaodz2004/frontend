import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {api} from "../../modules/api";

const initialState = {
    id: -1,
    username: "",
    is_authenticated: false
}

export const handleLogin = createAsyncThunk(
    "login",
        async function({username, password}) {
            const response = await api.users.usersLoginCreate({
                username,
                password
            })

            return response.data
        }
)

export const handleRegister = createAsyncThunk(
    "register",
        async function({username, email, password}) {
            const response = await api.users.usersRegisterCreate({
                username,
                email,
                password
            })

            return response.data
        }
)

export const handleLogout = createAsyncThunk(
    "logout",
        async function() {
            await api.users.usersLogoutCreate()
        }
)

export const handleUpdateProfile = createAsyncThunk(
    "updateProfile",
        async function(userData, thunkAPI) {
            const state = thunkAPI.getState()
            const {password} = userData
            const response = await api.users.usersUpdateUpdate(state.user.id, {
                password
            })

            return response.data
        }
)

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            state.is_authenticated = action.payload.is_authenticated
            state.id = action.payload.id
            state.username = action.payload.username
        }
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.is_authenticated = true
            state.id = action.payload.id
            state.username = action.payload.username
        });
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.is_authenticated = true
            state.id = action.payload.id
            state.username = action.payload.username
        });
        builder.addCase(handleLogout.fulfilled, (state) => {
            state.is_authenticated = false
            state.id = -1
            state.username = ""
        });
    }
})

export const {updateUserInfo} = userSlice.actions

export default userSlice.reducer