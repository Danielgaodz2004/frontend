import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NEXT_MONTH, PREV_MONTH} from "../../modules/consts";
import {api} from "../../modules/api";


const initialState = {
    draft_report_id: null,
    resources_count: null,
    report: null,
    reports: [],
    filters: {
        status: 0,
        date_formation_start: PREV_MONTH.toISOString().split('T')[0],
        date_formation_end: NEXT_MONTH.toISOString().split('T')[0]
    },
    save_mm: false
}

export const fetchReport = createAsyncThunk(
    "reports/report",
    async function(report_id) {
        const response = await api.reports.reportsRead(report_id)
        return response.data
    }
)

export const fetchReports = createAsyncThunk(
    "reports/reports",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.reports.reportsList({
            status: state.reports.filters.status,
            date_formation_start: state.reports.filters.date_formation_start,
            date_formation_end: state.reports.filters.date_formation_end
        })
        return response.data
    }
)

export const removeResourceFromDraftReport = createAsyncThunk(
    "reports/remove_resource",
    async function(resource_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.reports.reportsDeleteResourceDelete(state.reports.report.id, resource_id)
        return response.data
    }
)

export const deleteDraftReport = createAsyncThunk(
    "reports/delete_draft_report",
    async function(_, {getState}) {
        console.log("deleteDraftReport")
        const state = getState()
        await api.reports.reportsDeleteDelete(state.reports.report.id)
    }
)

export const sendDraftReport = createAsyncThunk(
    "reports/send_draft_report",
    async function(_, {getState}) {
        const state = getState()
        await api.reports.reportsUpdateStatusUserUpdate(state.reports.report.id)
    }
)

export const updateReport = createAsyncThunk(
    "reports/update_report",
    async function(data, {getState}) {
        const state = getState()
        await api.reports.reportsUpdateUpdate(state.reports.report.id, {
            ...data
        })
    }
)

export const updateResourceValue = createAsyncThunk(
    "reports/update_mm_value",
    async function({resource_id, plan_volume},thunkAPI) {
        const state = thunkAPI.getState()
        await api.reports.reportsUpdateResourceUpdate(state.reports.report.id, resource_id, {plan_volume})
    }
)

const reportsSlice = createSlice({
    name: 'reports',
    initialState: initialState,
    reducers: {
        saveReport: (state, action) => {
            state.draft_report_id = action.payload.draft_report_id
            state.resources_count = action.payload.resources_count
        },
        removeReport: (state) => {
            console.log("removeReport")
            state.report = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchReport.fulfilled, (state, action) => {
            state.report = action.payload
        });
        builder.addCase(fetchReports.fulfilled, (state, action) => {
            state.reports = action.payload
        });
        builder.addCase(removeResourceFromDraftReport.fulfilled, (state, action) => {
            if (state.report) {
                state.report.resources = action.payload
            }
        });
        builder.addCase(sendDraftReport.fulfilled, (state) => {
            state.report = null
            state.draft_report_id = null
            state.resources_count = null
        });
        builder.addCase(deleteDraftReport.fulfilled, (state) => {
            console.log("asdfasdfsda")
            state.report = null
            state.draft_report_id = null
            state.resources_count = null
        });
    }
})

export const { saveReport, removeReport, triggerUpdateMM, updateFilters } = reportsSlice.actions;

export default reportsSlice.reducer