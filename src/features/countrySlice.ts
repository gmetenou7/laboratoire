import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";





export const listCountryThunk = createAsyncThunk("COUNTRY/listCountry",
    async () => {
        const response = await callApi(true, 'pays', 'get', null,);
        return response.data.data
    })

const initialState = {
    status: "idle",
    data: [],
    formState: "idle"
}

const countrySlice = createSlice({
    initialState,
    name: "COUNTRY",
    reducers: {
        openCreateCountryForm(state) {
            state.formState = "create";
        },
        openUpdateCountryForm(state) {
            state.formState = "update";
        },
        closeCountryForm(state) {
            state.formState = "idle";
        }
    },
    extraReducers(builder) {
        builder

            // list Country action builder
            .addCase(listCountryThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(listCountryThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.data = action.payload;
            })

            .addCase(listCountryThunk.rejected, (state) => {
                state.status = "error"
            })
    }
})

export default countrySlice.reducer;
export const {
    openCreateCountryForm,
    closeCountryForm
} = countrySlice.actions;