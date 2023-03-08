import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";


export const createExamTypeThunk = createAsyncThunk("EXAMSTYPE/createExamType",
    async (data) => {
        const response = await callApi(true, 'typeexamen', 'post', null, data)
        return response
    }

)

export const updateExamTypeThunk = createAsyncThunk("EXAMSTYPE/updateExamType",
    async (request_data) => {
        const response = await callApi(true, `typeexamen/${request_data.matricule}`, 'put', null, request_data.data)
        return response
    }
)

export const listExamTypeThunk = createAsyncThunk("EXAMTYPE/listExamType",
    async () => {
        const response = await callApi(true, "typeexamen", "get", null);
        return response.data.data
    }
)

const initialState = {
    status: "idle",
    data: []
}

const examTypeSlice = createSlice({
    initialState,
    name: "EXAMSTYPE",
    reducers: {
        examTypeDeletedReducer(state, action: PayloadAction<string>) {
            const newTypeData = state.data.filter((item: any) => item.matricule !== action.payload);
            state.data = newTypeData;
        }
    },
    extraReducers(builder) {
        builder
            // create exams type action creator
            .addCase(createExamTypeThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(createExamTypeThunk.fulfilled, (state, action) => {
                state.status = "success";
                // state.data = state.data.concat(action.payload)
            })

            .addCase(createExamTypeThunk.rejected, (state) => {
                state.status = "error";
            })

            // update exams type action creator
            .addCase(updateExamTypeThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(updateExamTypeThunk.fulfilled, (state, action) => {
                state.status = "success";
                // state.data = state.data.concat(action.payload)
            })

            .addCase(updateExamTypeThunk.rejected, (state) => {
                state.status = "error";
            })

            // List exams type action creator
            .addCase(listExamTypeThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(listExamTypeThunk.fulfilled, (state, action) => {
                state.status = "success";
                state.data = action.payload
            })

            .addCase(listExamTypeThunk.rejected, (state) => {
                state.status = "error";
            })
    }
})

export default examTypeSlice.reducer;
export const { examTypeDeletedReducer } = examTypeSlice.actions
export const singleExamTypeSelector = (state, matricule) => state.examType.data.find(item => item.matricule === matricule)