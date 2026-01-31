import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as timeTableService from "../services/timeTableService";




export const fetchTimetables = createAsyncThunk(
    "timeTable/fetchTimetables",
    async (params) => {
        const data  = await timeTableService.getTimetableByClass(params);
        return data;
    }
);

export const fetchTimetablesByTeacher = createAsyncThunk(
    "timeTable/fetchTimetablesByTeacher",
    async (params) => {
        const data  = await timeTableService.getTimetableByTeacher(params);
        return data;
    }
);

export const createTimetable = createAsyncThunk(
    "timeTable/createTimetable",
    async (data) => {
        const { data: timetable } = await timeTableService.createTimetable(data);
        return timetable;
    }
);

export const updateTimetable = createAsyncThunk(
    "timeTable/updateTimetable",
    async (data) => {
        const { data: timetable } = await timeTableService.updateTimetable(data.id, data);
        return timetable;
    }
);

export const deleteTimetable = createAsyncThunk(
    "timeTable/deleteTimetable",
    async (data) => {
        const { data: timetable } = await timeTableService.deleteTimetable(data.id);
        return timetable;
    }
);



const timeTableSlice = createSlice({
    name: "timeTable",
    initialState: {
        timetables: [],
        timetablesByTeacher: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            /* ================= FETCH ================= */

            .addCase(fetchTimetables.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTimetables.fulfilled, (state, action) => {
                state.loading = false;
                console.log("FETCH TIMETABLES REDUCER HIT", action.payload);

                state.timetables = action.payload; // ✅ ARRAY
            })
            .addCase(fetchTimetables.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            /* ================= FETCH BY TEACHER ================= */

            .addCase(fetchTimetablesByTeacher.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTimetablesByTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.timetablesByTeacher = action.payload;
            })
            .addCase(fetchTimetablesByTeacher.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            /* ================= CREATE ================= */

            .addCase(createTimetable.fulfilled, (state, action) => {
                state.timetables.push(action.payload); // ✅ ADD
            })

            /* ================= UPDATE ================= */

            .addCase(updateTimetable.fulfilled, (state, action) => {
                const index = state.timetables.findIndex(
                    (t) => t.id === action.payload.id
                );

                if (index !== -1) {
                    state.timetables[index] = action.payload; // ✅ REPLACE ONE
                }
            })

            /* ================= DELETE ================= */

            .addCase(deleteTimetable.fulfilled, (state, action) => {
                state.timetables = state.timetables.filter(
                    (t) => t.id !== action.payload.id
                ); // ✅ REMOVE ONE
            });
    },
});



export default timeTableSlice.reducer;