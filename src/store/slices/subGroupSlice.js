import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as subGroupService from "../services/subGroupService";

export const fetchSubGroups = createAsyncThunk("subGroups/fetch", async () => {
    return await subGroupService.getSubgroups();
});


const subGroupSlice = createSlice({
    name: "subGroups",
    initialState: {
        subGroups: [], 
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubGroups.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchSubGroups.fulfilled, (state, action) => {
            state.loading = false;
            state.subGroups = action.payload;
        })
        .addCase(fetchSubGroups.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default subGroupSlice.reducer;