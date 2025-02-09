import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Calculation, T_CalculationsFilters, T_Code} from "modules/types.ts";
import {NEXT_MONTH, PREV_MONTH} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
// draft_calculation_id - 申请草案 ID
// products_count - 篮子中的服务数量
// calculation - 未结订单
// 计算 - 申请列表
// filters - 申请筛选器（按状态和申请形成日期范围筛选）
// save_mm - 用于更新草稿订单中 m-m 服务字段的服务标志
type T_CalculationsSlice = {
    draft_calculation_id: number | null,
    codes_count: number | null,
    calculation: T_Calculation | null,
    calculations: T_Calculation[],
    filters: T_CalculationsFilters,
    save_mm: boolean
}

const initialState:T_CalculationsSlice = {
    draft_calculation_id: null,
    codes_count: null,
    calculation: null,
    calculations: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchCalculation = createAsyncThunk<T_Calculation, string, AsyncThunkConfig>(
    "calculations/calculation",
    async function(calculation_id) {
        const response = await api.calculations.calculationsRead(calculation_id) as AxiosResponse<T_Calculation>
        return response.data
    }
)


export const fetchDraftCalculation = createAsyncThunk<T_Calculation, void, AsyncThunkConfig>(
    "calculations/draft_calculation",
    async function(_, thunkAPI) {
        console.log("fetchDraftCalculation")
        const state = thunkAPI.getState()
        const response = await api.calculations.calculationsRead(state.calculations.calculation.id) as AxiosResponse<T_Calculation>
        return response.data
    }
)


export const fetchCalculations = createAsyncThunk<T_Calculation[], object, AsyncThunkConfig>(
    "calculations/calculations",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.calculations.calculationsList({
            status: state.calculations.filters.status,
            date_formation_start: state.calculations.filters.date_formation_start,
            date_formation_end: state.calculations.filters.date_formation_end
        }) as AxiosResponse<T_Calculation[]>
        return response.data
    }
)

export const removeCodeFromDraftCalculation = createAsyncThunk<T_Code[], string, AsyncThunkConfig>(
    "calculations/remove_code",
    async function(code_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.calculations.calculationsDeleteCodeDelete(state.calculations.calculation.id, code_id) as AxiosResponse<T_Code[]>
        return response.data
    }
)

export const deleteDraftCalculation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/delete_draft_calculation",
    async function(_, {getState}) {
        const state = getState()
        await api.calculations.calculationsDeleteDelete(state.calculations.calculation.id)
    }
)

export const sendDraftCalculation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/send_draft_calculation",
    async function(_, {getState}) {
        const state = getState()
        await api.calculations.calculationsUpdateStatusUserUpdate(state.calculations.calculation.id)
    }
)

export const updateCalculation = createAsyncThunk<void, object, AsyncThunkConfig>(
    "calculations/update_calculation",
    async function(data, {getState}) {
        const state = getState()
        await api.calculations.calculationsUpdateUpdate(state.calculations.calculation.id, {
            ...data
        })
    }
)

export const updateCodeOrder = createAsyncThunk<void, string, AsyncThunkConfig>(
    "collections/update_mm_value",
    async function(code_id,thunkAPI) {
        const state = thunkAPI.getState()
        await api.calculations.calculationsUpdateCodeUpdate(state.calculations.calculation.id, code_id)
    }
)

const calculationsSlice = createSlice({
    name: 'calculations',
    initialState: initialState,
    reducers: {
        saveCalculation: (state, action) => {
            state.draft_calculation_id = action.payload.draft_calculation_id
            state.codes_count = action.payload.codes_count
        },
        removeCalculation: (state) => {
            state.calculation = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCalculation.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Calculation>) => {
            state.calculation = action.payload
        });
        builder.addCase(fetchDraftCalculation.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Calculation>) => {
            state.calculation = action.payload
        });
        builder.addCase(fetchCalculations.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Calculation[]>) => {
            state.calculations = action.payload
        });
        builder.addCase(removeCodeFromDraftCalculation.rejected, (state:T_CalculationsSlice) => {
            state.calculation = null
        });
        builder.addCase(removeCodeFromDraftCalculation.fulfilled, (state:T_CalculationsSlice, action: PayloadAction<T_Code[]>) => {
            if (state.calculation) {
                state.calculation.codes = action.payload as T_Code[]
            }
        });
        builder.addCase(sendDraftCalculation.fulfilled, (state:T_CalculationsSlice) => {
            state.calculation = null
        });
    }
})

export const { saveCalculation, removeCalculation, triggerUpdateMM, updateFilters } = calculationsSlice.actions;

export default calculationsSlice.reducer