import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as paymentService from "../services/paymentService";

// ✅ FETCH ALL PAYMENTS    
export const fetchAllPayments = createAsyncThunk(
  "payment/getFeeStructures",
  async (_, { rejectWithValue }) => { 
    try {
      const response = await paymentService.getFeeStructures();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchFeeStructureById = createAsyncThunk(
  "payment/getFeeStructureById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await paymentService.getFeeStructureById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPaymentsByInstitutionId = createAsyncThunk(
  "payment/getPaymentsByInstitutionId",
  async (institutionId, { rejectWithValue }) => { 
    try {
      const response = await paymentService.getPaymentsByInstitutionId(institutionId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    fullStructureById:[],
    paymentsByInstitutionId: [],
    loading: false,
    error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // FETCH ALL PAYMENTS
        .addCase(fetchAllPayments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload;
        })
        .addCase(fetchAllPayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // FETCH FEE STRUCTURE BY ID
        builder
        .addCase(fetchFeeStructureById.pending, (state) => {
            state.loading = true;
            state.error = null;
        } 
        )
        .addCase(fetchFeeStructureById.fulfilled, (state, action) => {
            state.loading = false;
            state.fullStructureById = action.payload;
            // You can handle the fetched fee structure by ID here if needed
        })
        .addCase(fetchFeeStructureById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // FETCH PAYMENTS BY INSTITUTION ID
        builder
        .addCase(fetchPaymentsByInstitutionId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPaymentsByInstitutionId.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentsByInstitutionId = action.payload;
        })
        .addCase(fetchPaymentsByInstitutionId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default paymentSlice.reducer;