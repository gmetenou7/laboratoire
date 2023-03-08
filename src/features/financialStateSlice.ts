import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";

export const financialStateThunk = createAsyncThunk("FINANCIAL/STATE",
    async (data) => {
        const response = await callApi(
            true,
            "situationcaisse",
            "post",
            data,
            null
        )
        return response.data.data
    }
)

export const financialStateRangeThunk = createAsyncThunk("FINANCIAL/STATE_RANGE",
    async (data) => {
        const response = await callApi(
            true,
            "situationcaisse",
            "post",
            data,
            null
        )
        return response.data.data
    }
)

const initialState = {
    status: {
        for: "idle",
        state: "idle"
    },
    data: []
}
const financialStateSlice = createSlice({
    name: "FINANCIAL",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(financialStateThunk.pending, (state) => {
                state.status = {
                    for: "list",
                    state: "loading"
                }
            })
            .addCase(financialStateThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "list",
                    state: "completed"
                };
                state.data = action.payload
            })
            .addCase(financialStateThunk.rejected, (state) => {
                state.status = {
                    for: "list",
                    state: "error"
                };
            })

            .addCase(financialStateRangeThunk.pending, (state) => {
                state.status = {
                    for: "range",
                    state: "loading"
                }
            })
            .addCase(financialStateRangeThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "range",
                    state: "completed"
                };
                state.data = action.payload
            })
            .addCase(financialStateRangeThunk.rejected, (state) => {
                state.status = {
                    for: "range",
                    state: "error"
                };
            })

    }
})

export default financialStateSlice.reducer;
export const financialStatusSelector = (state: any) => state.financial.status
export const financialStateSelector = (state: any) => state.financial.data