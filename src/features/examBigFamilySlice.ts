import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";


export const listBigFamilyExamThunk = createAsyncThunk(
    "BIGFAMILYEXAM/listBigFamilyExam",
    async (matricule_labo) => {
        const response = await callApi(true, `allfmaille/${matricule_labo}`, 'get', null);
        return response?.data?.data
    }
)

export const createBigFamilyExamThunk = createAsyncThunk(
    "BIGFAMILYEXAM/createBigFamilyExam",
    async (data) => {
        const response = await callApi(true, "bfamille", "post", null, data);
        return response
    }
)

export const updateBigFamilyExamThunk = createAsyncThunk(
    "BIGFAMILYEXAM/updateBigFamilyExam",
    async (data: any) => {
        const response = await callApi(true, `bfamille/${data.code}`, "put", null, data?.data);
        return response
    }
)

const initialState = {
    status: {
        for: "idle",
        state: "idle"
    },
    data: []
}

const bigFamilyExamSlice = createSlice({
    initialState,
    name: "BIGFAMILYEXAM",
    reducers: {},
    extraReducers(builder) {
        builder

            //create a family exam action creator
            .addCase(createBigFamilyExamThunk.pending, (state) => {
                state.status = {
                    for: "create",
                    state: "loading"
                }
            })
            .addCase(createBigFamilyExamThunk.fulfilled, (state: any, action: any) => {
                state.status = {
                    for: "create",
                    state: "success"
                }
                state.data.push(action.payload?.data?.data)
            })
            .addCase(createBigFamilyExamThunk.rejected, (state) => {
                state.status = {
                    for: "create",
                    state: "error"
                }
            })

            // List big exam family action creator
            .addCase(listBigFamilyExamThunk.pending, (state) => {
                state.status = {
                    for: "list",
                    state: "loading"
                }
            })
            .addCase(listBigFamilyExamThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "list",
                    state: "completed"
                }
                state.data = action.payload
            })
            .addCase(listBigFamilyExamThunk.rejected, (state) => {
                state.status = {
                    for: "list",
                    state: "error"
                }
            })

            //update family exam action creator
            .addCase(updateBigFamilyExamThunk.pending, (state) => {
                state.status = {
                    for: "update",
                    state: "loading"
                }
            })
            .addCase(updateBigFamilyExamThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "update",
                    state: "completed"
                }
                
            })
            .addCase(updateBigFamilyExamThunk.rejected, (state) => {
                state.status = {
                    for: "update",
                    state: "error"
                }
            })

    }

})

export default bigFamilyExamSlice.reducer;
export const bigFamilyExamStatusSelector = (state: any) => state.bigFamilyExam.status
export const bigFamilyExamSelector = (state: any) => state.bigFamilyExam.data
export const singleBigFamilyExamSelector = (state: any, code: any) => state.bigFamilyExam?.data?.find(
    (bigFamilyExam: any) => bigFamilyExam?.code === code
) 
