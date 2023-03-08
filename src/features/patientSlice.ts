import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";

export const createPatientThunk = createAsyncThunk(
  "PATIENTS/createPatient",
  async (data) => {
    const response = await callApi(true, "client", "post", null, data);
    return response;
  }
);

export const listPatientThunk = createAsyncThunk(
  "PATIENTS/listPatient",
  async (lab_id: string) => {
    const response = await callApi(true, `clientlabo/${lab_id}`, "get", null);
    return response.data.data;
  }
);

export const updatePatientThunk = createAsyncThunk(
  "PATIENTS/updatePatient",
  async (data) => {
    const response = await callApi(true, `client/${data.matricule}`, "put", null, data.data);
    return response;
  }
);

const initialState = {
  status: "idle",
  data: [],
};

const patientSlice = createSlice({
  initialState,
  name: "PATIENTS",
  reducers: {},
  extraReducers(builder) {
    builder
      // Create patient action creator
      .addCase(createPatientThunk.pending, (state) => {
        state.status = "loading";
      })

      .addCase(createPatientThunk.fulfilled, (state, action) => {
        state.status = "completed";
        if (action?.payload?.data?.success) {
          state.data.push(action?.payload?.data?.data);
        }
      })

      .addCase(createPatientThunk.rejected, (state) => {
        state.status = "error";
      })

      //Update patients
      .addCase(updatePatientThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePatientThunk.fulfilled, (state, action) => {
        state.status = "completed";
        if (action?.payload?.data?.success) {
          state.data.push(action?.payload?.data?.data);
        }
      })
      .addCase(updatePatientThunk.rejected, (state) => {
        state.status = "rejected";
      })

      // List all patients action creator
      .addCase(listPatientThunk.pending, (state) => {
        state.status = "loading";
      })

      .addCase(listPatientThunk.fulfilled, (state, action) => {
        state.status = "completed";
        state.data = action.payload;
      })

      .addCase(listPatientThunk.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default patientSlice.reducer;
export const singlePatientSelector = (state, matricule) =>
  state.patient?.data?.find((patient) => patient?.matricule === matricule);
export const patientStatus = (state: any) => state.patient.status
