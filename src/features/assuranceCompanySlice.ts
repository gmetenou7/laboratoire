import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx"


export const listAssuranceCompanyThunk = createAsyncThunk(
    "ASSURANCECOMPANY/listAssuranceCompany",
    async (matricule_labo) => {
        const response = await callApi(true, `assureurlabo/${matricule_labo}`, "get", null);
        return response?.data?.data;
    }
)

export const createAssuranceCompanyThunk = createAsyncThunk("ASSURANCECOMPANY/createAssuranceCompany",
    async (data) => {
        const response = await callApi(true, "assureur", "post", null, data)
        return response
    }

)

export const updateAssuranceCompanyThunk = createAsyncThunk(
    "ASSURANCECOMPANY/updateAssuranceCompany",
    async (data: any) => {
        const response = await callApi(true, `assureur/${data?.code}`, "put", null, data?.data);
        return response;

    }

)


const initialState = {
    status: {
        for: "idle",
        state: "idle"
    },
    data: []
}

const assuranceCompanySlice = createSlice({
    initialState,
    name: "ASSURANCECOMPANY",
    reducers: {},
    extraReducers(builder) {
        builder

            //list assurance company
            .addCase(listAssuranceCompanyThunk.pending, (state) => {
                state.status = {
                    for: "list",
                    state: "loading"
                }
            })

            .addCase(listAssuranceCompanyThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "list",
                    state: "completed"
                }
                state.data = action.payload;
            })
            .addCase(listAssuranceCompanyThunk.rejected, (state) => {
                state.status = {
                    for: "list",
                    state: "error"
                }
            })

            // create assurance company

            .addCase(createAssuranceCompanyThunk.pending, (state) => {
                state.status = {
                    for: "create",
                    state: "loading"
                }
            })
            .addCase(createAssuranceCompanyThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "create",
                    state: "completed"
                }
                //state.data = action?.payload.data?.data;
            })
            .addCase(createAssuranceCompanyThunk.rejected, (state) => {
                state.status = {
                    for: "create",
                    state: "error"
                }
            })

            // update 

            .addCase(updateAssuranceCompanyThunk.pending, (state) => {
                state.status = {
                    for: "update",
                    state: "loading"
                }
            })
            .addCase(updateAssuranceCompanyThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "update",
                    state: "completed"
                }
                //state.data = action.payload;
            })
            .addCase(updateAssuranceCompanyThunk.rejected, (state) => {
                state.status = {
                    for: "update",
                    state: "error"
                }
            })


    }
})

export default assuranceCompanySlice.reducer;
export const assuranceCompanyStatusSelector = (state: any) => state.assuranceCompany.status;
export const singleAssuranceCompanyStatusSelector = (state: any, code: any) => state.assuranceCompany?.data?.find(
    (assuranceCompany: any) => assuranceCompany?.code === code
)