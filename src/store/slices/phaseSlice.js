import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as phaseService from "../services/phasesService";

export const fetchPhases = createAsyncThunk("phases/fetch", async () => {
    return await phaseService.getPhases();
});

const phaseSlice = createSlice({
    name: "phases",
    initialState: {
        phases: [], 
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder 
        .addCase(fetchPhases.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPhases.fulfilled, (state, action) => {
            state.loading = false;
            state.phases = action.payload;
        })
        .addCase(fetchPhases.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default phaseSlice.reducer;