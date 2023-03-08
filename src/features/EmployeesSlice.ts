import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from '../Utils/Utils.tsx'

export const createEmployeesThunk = createAsyncThunk(
  "EMPLOYEES/createEmployees",
  async (data) => {
    const response = await callApi(true, "employe", "post", null, data)
    return response
  }
)

export const listEmployeesThunk = createAsyncThunk(
  "EMPLOYEES/listEmployees",
  async (lab_id) => {
    const response = await callApi(true, `employelabo/${lab_id}`, "get", null)
    return response.data.data
  }
)

const initialState = {
  status: "idle",
  data: [],
}

const employeesSlice = createSlice({
  initialState,
  name: "EMPLOYEES",
  reducers: {},
  extraReducers(builder) {
    builder
      //create employee
      .addCase(createEmployeesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployeesThunk.fulfilled, (state, action) => {
        state.status = "completed";
        // if(action?.payload?.data?.success){
        //     state.data.push(action?.payload?.data?.data)
        // }
      })
      .addCase(createEmployeesThunk.rejected, (state) => {
        state.status = 'error'
      })

      //list all employee

      .addCase(listEmployeesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listEmployeesThunk.fulfilled, (state, action) => {
        state.status = "completed"
        state.data = action.payload
      })
      .addCase(listEmployeesThunk.rejected, (state) => {
        state.status = "error"
      })
  }
})

export default employeesSlice.reducer;