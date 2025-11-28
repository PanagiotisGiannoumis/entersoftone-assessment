import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../types/employee";
import { fetchEmployees as apiFetch } from "../api/employeesApi";

export interface EmployeesState {
  items: Employee[];
  loading: boolean;
  error?: string;
  search: string;
  departmentFilter: string; // "" means all
  selectedEmployeeId?: string;
}

const initialState: EmployeesState = {
  items: [],
  loading: false,
  error: undefined,
  search: "",
  departmentFilter: "",
  selectedEmployeeId: undefined,
};

export const loadEmployees = createAsyncThunk(
  "employees/load",
  async () => {
    const data = await apiFetch();
    return data as Employee[];
  }
);

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setDepartmentFilter(state, action: PayloadAction<string>) {
      state.departmentFilter = action.payload;
    },
    selectEmployee(state, action: PayloadAction<string | undefined>) {
      state.selectedEmployeeId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadEmployees.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loadEmployees.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setDepartmentFilter, selectEmployee } = slice.actions;
export default slice.reducer;
