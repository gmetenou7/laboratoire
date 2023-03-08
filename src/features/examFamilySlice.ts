import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";


export const listExamFamilyThunk = createAsyncThunk("EXAMSFAMILY/listExamsFamily",
    async (matricule_labo) => {
        const response = await callApi(true, `famillelabo/${matricule_labo}`, "get", null);
        return response;
    })

export const createExamFamilyThunk = createAsyncThunk(
    "EXAMSFAMILY/createExamFamily",
    async (data) => {
        const response = await callApi(true, "famille", "post", null, data);
        return response;
    })

export const updateExamFamilyThunk = createAsyncThunk(
    "EXAMSFAMILY/updateExamFamily",
    async (data: any) => {
        const response = await callApi(true, `famille/${data.matricule}`, "put", null, data?.data);
        return response;
    })

const initialState = {
    status: "idle",
    data: []
}

const examFamilySlice = createSlice({
    initialState,
    name: "EXAMSFAMILY",
    reducers: {

    },
    extraReducers(builder) {
        builder
            // Create exam family action creator
            .addCase(createExamFamilyThunk.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createExamFamilyThunk.fulfilled, (state, action) => {
                state.status = "success";
                // state.data.concat(action.payload);
            })
            .addCase(createExamFamilyThunk.rejected, (state) => {
                state.status = "error"
            })
            // update exam family action creator
            // .addCase(updateExamFamilyThunk.pending, (state) => {
            //     state.status = "loading"
            // })
            // .addCase(updateExamFamilyThunk.fulfilled, (state, action) => {
            //     state.status = "success";
            //     // state.data.concat(action.payload);
            // })
            // .addCase(updateExamFamilyThunk.rejected, (state) => {
            //     state.status = "error"
            // })
            // Fetch all exam family action creator
            .addCase(listExamFamilyThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(listExamFamilyThunk.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload?.data?.data
            })
            .addCase(listExamFamilyThunk.rejected, (state) => {
                state.status = "error";
            })
    }
})

export default examFamilySlice.reducer