// src/store/jitsiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getJitsiToken } from "../services/jitsiService";

export const fetchJitsiToken = createAsyncThunk(
  "jitsi/fetchToken",
  async (roomName) => {
    const { token } = await getJitsiToken(roomName);
    return { roomName, token };
  }
);

const jitsiSlice = createSlice({
  name: "jitsi",
  initialState: {
    token: null,
    roomName: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearJitsi: (state) => {
      state.token = null;
      state.roomName = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJitsiToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJitsiToken.fulfilled, (state, action) => {
        state.loading = false;
        state.roomName = action.payload.roomName;
        state.token = action.payload.token;
      })
      .addCase(fetchJitsiToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearJitsi } = jitsiSlice.actions;
export default jitsiSlice.reducer;
