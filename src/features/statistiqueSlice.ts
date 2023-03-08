import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";

export const listStatistiqueThunk = createAsyncThunk(
    "STATISTIQUES/listStatistiques",
    async (id_labo) => {
        const response = await callApi(true, `allbon/${id_labo}`, "get", null)
        return response.data.data;
    }
)

const initialState = {
    status: "idle",
    data: {},
}

const statistiqueSlice = createSlice({
    initialState,
    name: "STATISTIQUES",
    reducers: {},
    extraReducers(builder) {
        builder

            .addCase(listStatistiqueThunk.pending, (state) => {
                state.status = "loading"
            })
            .addCase(listStatistiqueThunk.fulfilled, (state, action) => {
                state.status = "completed"
                state.data = action?.payload

            })
            .addCase(listStatistiqueThunk.rejected, (state) => {
                state.status = "error"
            })
    }
})

export default statistiqueSlice.reducer;
export const statisticStatusSelector = (state: any) => state.statistiques.status;
export const statisticExamPaySelector = (state: any) => state.statistiques.data.nbr_bon_pay;
export const statisticExamUnPaySelector = (state: any) => state.statistiques.data.nbr_bon_not_to_pay;
// export const singleAgenceNberSelector = (state, matricule) =>
//   state.singleAgenceNber?.data?.find((singleAgenceNber) => singleAgenceNber?.agencematricule === matricule);