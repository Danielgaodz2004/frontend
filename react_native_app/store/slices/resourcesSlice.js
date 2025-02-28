import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../modules/api";
import {saveReport} from "./reportsSlice";

const initialState = {
    resource_density: "",
    resource: null,
    resources: []
}

export const fetchResource = createAsyncThunk(
    "fetch_resource",
        async function(id) {
            const response = await api.resources.resourcesRead(id)
            return response.data
        }
)

export const fetchResources = createAsyncThunk(
    "fetch_resources",
        async function(_, thunkAPI) {
            const state = thunkAPI.getState();

            const response = await api.resources.resourcesList({
                resource_density: state.resources.resource_density
            })

            thunkAPI.dispatch(saveReport({
                draft_report_id: response.data.draft_report_id,
                resources_count: response.data.resources_count
            }))

            return response.data.resources
        }
)

export const addResourceToReport = createAsyncThunk(
    "resources/add_resource_to_report",
        async function(resource_id, thunkAPI) {
            await api.resources.resourcesAddToReportCreate(resource_id)

            thunkAPI.dispatch(fetchResources())
        }
)

const resourcesSlice = createSlice({
    name: 'resources',
    initialState: initialState,
    reducers: {
        updateResourceName: (state, action) => {
            state.resource_density = action.payload
        },
        removeSelectedResource: (state) => {
            state.resource = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchResources.fulfilled, (state, action) => {
            state.resources = action.payload
        });
        builder.addCase(fetchResource.fulfilled, (state, action) => {
            state.resource = action.payload
        });
    }
})

export const { updateResourceName, removeSelectedResource} = resourcesSlice.actions;

export default resourcesSlice.reducer