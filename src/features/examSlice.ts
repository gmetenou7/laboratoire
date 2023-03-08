import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";

export const listExamsThunk = createAsyncThunk(
  "EXAMS/listExams",
  async (data: any) => {
    const response = await callApi(
      true,
      `examenslabo/${data.matricule_labo}/${data.matricule_ag}`,
      "get",
      null
    );
    return response;
  }
);


export const listLaboratoryExamsType = createAsyncThunk(
  "EXAMS/listLaboratoryExamsType",
  async (matricule_labo) => {
    const response = await callApi(
      true,
      `examtypelabo/${matricule_labo}`,
      "get",
      null
    );
    return response;
  }
);

export const listLaborantinExamThunk = createAsyncThunk(
  "EXAMS/LIST_LABORENTIN",
  async (data) => {
    const response = await callApi(
      true,
      "bonexamenlaborantin",
      "post",
      data,
      null
    );
    return response?.data?.data;
  }
);


const initialState = {
  status: "idle",
  data: [],
  examenFamily: [],
  examenType: [],
  listExamens: [],
  total: 0,
};

const examSlice = createSlice({
  initialState,
  name: "EXAMS",
  reducers: {
    setFamily(state, action) {
      state.examenFamily = action.payload;

    },

    setTypeExam(state, action) {
      state.examenType = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(listExamsThunk.pending, (state) => {
        state.status = "loading";
      })

      .addCase(listExamsThunk.fulfilled, (state, action) => {
        state.status = "completed";
        if (action.payload?.data?.success) {
          state.listExamens = action.payload?.data?.data;
        }
      })

      .addCase(listExamsThunk.rejected, (state) => {
        state.status = "error";
      })

      // List laborentin exams action creator
      .addCase(listLaborantinExamThunk.pending, (state) => {
        state.status = "loading";
      })

      .addCase(listLaborantinExamThunk.fulfilled, (state, action) => {
        state.status = "completed";
        state.listExamens = action.payload
      })

      .addCase(listLaborantinExamThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(listLaboratoryExamsType.pending, (state) => {
        state.status = "loading";
      })

      .addCase(listLaboratoryExamsType.fulfilled, (state, action) => {
        state.status = "completed";
        if (action.payload?.data?.success) {
          state.examenType = action.payload?.data?.data;
        }
      })
      .addCase(listLaboratoryExamsType.rejected, (state) => {
        state.status = "error";
      })
  },
});

export const { setFamily, setTypeExam } = examSlice.actions;
export default examSlice.reducer;

export const patientExams = (state: any, matricule: string) =>
  state.exams.listExamens.filter((exam: any) => exam.matriculecli === matricule);

export const examsReceiveStatus = (state: any) =>
  state.exams.listExamens.filter((exam: any) => exam.statut === "reçu");

export const examsInProcessStatus = (state: any) =>
  state.exams.listExamens.filter((exam: any) => exam.statut === "encours");

export const examsCompletedStatus = (state: any) =>
  state.exams.listExamens.filter((exam: any) => exam.statut === "terminer");

export const laborantinExams = (state: any) =>
  state.exams.listExamens?.filter((item: any) => item.mesbons === "yes")

export const listLaboratoryExamsTypeSelector = (state: any) => state.exams.examenType;
export const examStatusSelector = (state: any) => state.exams.status
