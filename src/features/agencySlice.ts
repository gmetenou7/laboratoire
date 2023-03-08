import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";

export const listAgenciesThunk = createAsyncThunk("AGENCIES/LIST",
    async (matricule_labo) => {
        const response = await callApi(true, `agencelabo/${matricule_labo}`, 'get', null,);
        return response.data.data
    })

const initialState = {
    status: "idle",
    data: [],
}

const agenciesSlice = createSlice({
    initialState,
    name: "AGENCIES",
    reducers: {
    },
    extraReducers(builder) {
        builder
            // list services action builder
            .addCase(listAgenciesThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(listAgenciesThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.data = action.payload;
            })

            .addCase(listAgenciesThunk.rejected, (state) => {
                state.status = "error"
            })
    }
})

export default agenciesSlice.reducer;

export const agenciesSelector = (state: any) => state.agencies.data
export const singleAgencySelector = (state: any, agencyId: string) => state.agencies.data.find(
    (agency: any) => agency.matricule === agencyId
)
export const agencyStatusSelector = (state: any) => state.agencies.status