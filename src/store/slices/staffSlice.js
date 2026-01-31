import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as staffService from "../services/staffService";

// Create Staff Registration
export const createStaffRegistration = createAsyncThunk(
    "staff/createStaffRegistration",
    async (staffData, { rejectWithValue }) => {
        try {
            const response = await staffService.createStaffRegistration(staffData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get All Staff Registrations
export const getAllStaffRegistrations = createAsyncThunk(
    "staff/getAllStaffRegistrations",
    async (_, { rejectWithValue }) => {
        try {
            const response = await staffService.getStaffRegistrations();
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get Staff Registration by ID
export const getStaffRegistrationById = createAsyncThunk(
    "staff/getStaffRegistrationById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await staffService.getStaffRegistrationById(id);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update Staff Registration
export const updateStaffRegistration = createAsyncThunk(
    "staff/updateStaffRegistration",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await staffService.updateStaffRegistration(id, updates);
            return response; // ✅ return updated staff registration
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete Staff Registration
export const deleteStaffRegistration = createAsyncThunk(
    "staff/deleteStaffRegistration",
    async (id, { rejectWithValue }) => {
        try {
            await staffService.deleteStaffRegistration(id);
            return id; // ✅ return the deleted staff registration id
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const staffSlice = createSlice({
    name: "staff",
    initialState: {
        staffRegistrations: [],
        currentStaffRegistration: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.staffRegistrations = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder
            .addCase(createStaffRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStaffRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.staffRegistrations.push(action.payload);
            })
            .addCase(createStaffRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get
        builder
            .addCase(getAllStaffRegistrations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStaffRegistrations.fulfilled, (state, action) => {
                state.loading = false;

                state.staffRegistrations = Array.isArray(action.payload.staffRegistrations)
                    ? action.payload.staffRegistrations
                    : [];
            })

            .addCase(getAllStaffRegistrations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get by ID
        builder
            .addCase(getStaffRegistrationById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStaffRegistrationById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentStaffRegistration = action.payload;
            })
            .addCase(getStaffRegistrationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Update
        builder
            .addCase(updateStaffRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStaffRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.staffRegistrations = state.staffRegistrations.map((staff) =>
                    staff.id === action.payload.id ? action.payload : staff
                );
            })
            .addCase(updateStaffRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete
        builder
            .addCase(deleteStaffRegistration.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteStaffRegistration.fulfilled, (state, action) => {
                state.loading = false;
                state.staffRegistrations = state.staffRegistrations.filter(
                    (staff) => staff.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteStaffRegistration.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = staffSlice.actions;    
export default staffSlice.reducer;