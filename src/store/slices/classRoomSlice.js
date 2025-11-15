import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as classroomService from "../services/classroomService";

// Create Classroom
export const createClassroom = createAsyncThunk(
    "classroom/createClassroom",
    async (classData, { rejectWithValue }) => {
        try {
            const response = await classroomService.createClassroom(classData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get Classrooms
export const getClassroom = createAsyncThunk(
    "classroom/getClassrooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await classroomService.getClassrooms();
            //   console.log("Get Classrooms Response:", response.data);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getClassroomById = createAsyncThunk(
    "classroom/getClassroomById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await classroomService.getClassroomById(id);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update Classroom
export const updateClassroom = createAsyncThunk(
    "classroom/updateClassroom",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await classroomService.updateClassroom(id, updates);
            return response; // ✅ return updated classroom
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete Classroom
export const deleteClassroom = createAsyncThunk(
    "classroom/deleteClassroom",
    async (id, { rejectWithValue }) => {
        try {
            await classroomService.deleteClassroom(id);
            return id; // ✅ return the deleted classroom id
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const classroomSlice = createSlice({
    name: "classrooms",
    initialState: {
        classrooms: [],
        classroom: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.classrooms = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder
            .addCase(createClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms.push(action.payload);
            })
            .addCase(createClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get
        builder
            .addCase(getClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = Array.isArray(action.payload.classrooms)
                    ? action.payload.classrooms
                    : [];
            })

            .addCase(getClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get by ID
        builder
            .addCase(getClassroomById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassroomById.fulfilled, (state, action) => {
                state.loading = false;
                state.classroom = action.payload;
            })
            .addCase(getClassroomById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Update
        builder
            .addCase(updateClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = state.classrooms.map((cls) =>
                    cls.id === action.payload.id ? action.payload : cls
                );
            })
            .addCase(updateClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete
        builder
            .addCase(deleteClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = state.classrooms.filter(
                    (cls) => cls.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = classroomSlice.actions;
export default classroomSlice.reducer;
