import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Code, T_CodesListResponse} from "modules/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {api} from "modules/api.ts";
import {AxiosResponse} from "axios";
import {saveCalculation} from "store/slices/calculationsSlice.ts";

type T_CodesSlice = {
    code_name: string
    code: null | T_Code
    codes: T_Code[]
}

const initialState:T_CodesSlice = {
    code_name: "",
    code: null,
    codes: []
}

export const fetchCode = createAsyncThunk<T_Code, string, AsyncThunkConfig>(
    "fetch_code",
    async function(id) {
        const response = await api.codes.codesRead(id) as AxiosResponse<T_Code>
        return response.data
    }
)

export const fetchCodes = createAsyncThunk<T_Code[], object, AsyncThunkConfig>(
    "fetch_codes",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.codes.codesList({
            code_name: state.codes.code_name
        }) as AxiosResponse<T_CodesListResponse>

        thunkAPI.dispatch(saveCalculation({
            draft_calculation_id: response.data.draft_calculation_id,
            codes_count: response.data.codes_count
        }))

        return response.data.codes
    }
)

export const addCodeToCalculation = createAsyncThunk<void, string, AsyncThunkConfig>(
    "codes/add_code_to_calculation",
    async function(code_id) {
        await api.codes.codesAddToCalculationCreate(code_id)
    }
)

const codesSlice = createSlice({
    name: 'codes',
    initialState: initialState,
    reducers: {
        updateCodeName: (state, action) => {
            state.code_name = action.payload
        },
        removeSelectedCode: (state) => {
            state.code = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCodes.fulfilled, (state:T_CodesSlice, action: PayloadAction<T_Code[]>) => {
            state.codes = action.payload
        });
        builder.addCase(fetchCode.fulfilled, (state:T_CodesSlice, action: PayloadAction<T_Code>) => {
            state.code = action.payload
        });
    }
})

export const { updateCodeName, removeSelectedCode} = codesSlice.actions;

export default codesSlice.reducer