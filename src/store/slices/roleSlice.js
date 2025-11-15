import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as roleService from "../services/roleService";

export const fetchAllRole = createAsyncThunk(
  "role/fetchAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await roleService.getAllRole();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRole = createAsyncThunk(
  "role/fetchRole",
  async (roleId, { rejectWithValue }) => {
    try {
      const response = await roleService.getRole(roleId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createRole = createAsyncThunk(
  "role/createRole",
  async (roleData, { rejectWithValue }) => {    
    try {
      const response = await roleService.createRole(roleData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await roleService.updateRole(id, updates);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, { rejectWithValue }) => {  
    try {
      await roleService.deleteRole(id);
      return id; // return deleted role ID
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    }
);

const roleSlice = createSlice({
    name: "role",   
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearRole: (state) => {
            state.data = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        //fetchAllRole
        builder 
        .addCase(fetchAllRole.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllRole.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchAllRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //fetchRole
        builder 
        .addCase(fetchRole.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRole.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.map((role) =>
                role.id === action.payload.id ? action.payload : role
            );
        })
        .addCase(fetchRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //createRole
        builder 
        .addCase(createRole.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createRole.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
        })
        .addCase(createRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //updateRole
        builder 
        .addCase(updateRole.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateRole.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.map((role) =>
                role.id === action.payload.id ? action.payload : role
            );
        })
        .addCase(updateRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        //deleteRole
        builder 
        .addCase(deleteRole.pending, (state) => {   
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteRole.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.filter((role) => role.id !== action.payload);
        })
        .addCase(deleteRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

// export const { clearRole } = roleSlice.actions;

export default roleSlice.reducer;
