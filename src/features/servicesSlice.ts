import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";

export const listServicesThunk = createAsyncThunk("COUNTRY/LIST",
    async (matricule_labo) => {
        const response = await callApi(true, `servicelabag/${matricule_labo}/""`, 'get', null,);
        return response.data.data
    })

   

const initialState = {
    status: "idle",
    data: [],
}

const servicesSlice = createSlice({
    initialState,
    name: "SERVICES",
    reducers: {
    },
    extraReducers(builder) {
        builder
            // list services action builder
            .addCase(listServicesThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(listServicesThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.data = action.payload;
            })

            .addCase(listServicesThunk.rejected, (state) => {
                state.status = "error"
            })
    }
})

export default servicesSlice.reducer;

export const servicesSelector = (state: any) => state.services.data
export const agencyServicesSelector = (state: any, agencyId: string) => state.services.data.filter((services: any) => services.matricule_ag === agencyId)
export const servicesStatusSelector = (state: any) => state.services.status
export const singleServiceSelector = (state:any, serviceId: string)=> state.services.data.find((service:any)=> service?.matricule ===serviceId)