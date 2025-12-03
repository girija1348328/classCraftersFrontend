import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as institutionService from '../services/institutionService';

// ================================
// 🚀 Fetch All Institutions (API)
// ================================
export const fetchInstitutions = createAsyncThunk(
    'institution/fetchInstitutions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await institutionService.getInstitutions();
            return response.data || response; // support both axios & fetch
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// ================================
// 📌 Initial State
// ================================
const initialState = {
    institutions: [],
    currentInstitution: null,
    loading: false,
    error: null,
};

// ================================
// 🧩 Slice
// ================================
const institutionSlice = createSlice({
    name: 'institution',
    initialState,

    reducers: {
        setCurrentInstitution: (state, action) => {
            state.currentInstitution = action.payload;
        },

        setInstitutions: (state, action) => {
            state.institutions = action.payload;
        },

        addInstitution: (state, action) => {
            state.institutions.push(action.payload);
        },

        removeInstitution: (state, action) => {
            state.institutions = state.institutions.filter(
                (inst) => inst.id !== action.payload
            );
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },

    // ================================
    // 🔄 Handle Async Thunks
    // ================================
    extraReducers: (builder) => {
        // Fetch Institutions
        builder
            .addCase(fetchInstitutions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchInstitutions.fulfilled, (state, action) => {
                state.loading = false;
                state.institutions = action.payload;
            })

            .addCase(fetchInstitutions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// ================================
// 📤 Export Actions
// ================================
export const {
    setInstitutions,
    setCurrentInstitution,
    addInstitution,
    removeInstitution,
    setLoading,
    setError,
} = institutionSlice.actions;

// ================================
// 📤 Export Reducer
// ================================
export default institutionSlice.reducer;
