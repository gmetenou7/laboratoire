import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx"

interface QueryParams {
    matricule_labo: string,
    matricule_ag: string
}

export const listBillsThunk = createAsyncThunk("BILL/listBill",
    async (data: QueryParams) => {
        const response = await callApi(true, `facturelabo/${data?.matricule_labo}/${data?.matricule_ag}`, "get", null);
        return response;
    }
)

const initialState = {
    status: "idle",
    listBills: []
}


const billSlice = createSlice({
    initialState,
    name: "BILL",
    reducers: {

    },
    extraReducers(builder) {
        builder

            // List Bill action creator
            .addCase(listBillsThunk.pending, (state) => {
                state.status = "pending"
            })

            .addCase(listBillsThunk.fulfilled, (state, action) => {
                state.status = "completed";
                if (action.payload.data.success) {
                    state.listBills = action?.payload?.data?.data;
                }
            })

            .addCase(listBillsThunk.rejected, (state) => {
                state.status = "error";
            })
    }
})

export default billSlice.reducer;
export const billStatus = (state: any) => state.bills.status