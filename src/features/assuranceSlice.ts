import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx"

export const createAssuranceThunk = createAsyncThunk("ASSURANCE/CREATE",
    async (data) => {
        const response = await callApi(
            true,
            "assureur",
            "post",
            data,
            null
        )
        return response.data.data;
    }
);

interface AssuranceType {
    nom: string
}

const initialState = {
    status: {
        for: "idle",
        state: "idle"
    },
    assuranceData: [],
    isPresent: true
}

const assuranceSlice = createSlice({
    name: "ASSURANCE",
    initialState,
    reducers: {


    },
    extraReducers(builder) {
        builder
            // Create assurance actions creator
            .addCase(createAssuranceThunk.pending, (state) => {
                state.status = {
                    for: "create",
                    state: "loading"
                }
            })
            .addCase(createAssuranceThunk.fulfilled, (state: any, action: PayloadAction<AssuranceType>) => {
                state.status = {
                    for: "create",
                    state: "success"
                }
                state.assuranceData.unshift(action.payload);

            })
            .addCase(createAssuranceThunk.rejected, (state) => {
                state.status = {
                    for: "create",
                    state: "error"
                }
            })
    }
})

export default assuranceSlice.reducer;
export const statusSelector = (state: any) => state.assurance.status;
export const assuranceDataSelector = (state: any) => state.assurance.assuranceData;