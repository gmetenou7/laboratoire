import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import callApi from "../Utils/Utils.tsx";

export const createInstitutionThunk = createAsyncThunk(
    "INSTITUTION/CREATE",
    async (data) => {
        const response = await callApi(true, "entrepriseinstitution", "post", null, data);
        return response?.data?.data;
    }
);

export const listInstitutionThunk = createAsyncThunk(
    "INSTITUTION/LIST",
    async (data:any) => {
        const response = await callApi(true, `entrepriseinstitutionlaboassurance/${data?.matricule_labo}/${data?.code}`, "get", null);
        return response?.data?.data;
    }
)

export const updateInstitutionThunk = createAsyncThunk(
    "INSTITUTION/updateInstitution",
    async (data: any) => {
        const response = await callApi(true, `entrepriseinstitution/${data?.code}`, "put", null, data?.data);
        
        return response;

    }

)



const initialState = {
status:{
    for: "idle",
    state: "idle"
},
data: []

}

const institutionSlice = createSlice({
    initialState,
    name: "INSTITUTION",
    reducers: {},
    extraReducers(builder) {
        builder

            //list assurance company
            .addCase(listInstitutionThunk.pending, (state) => {
                state.status = {
                    for: "list",
                    state: "loading"
                }
            })

            .addCase(listInstitutionThunk.fulfilled, (state, action) => {
                state.status = {
                    for: "list",
                    state: "completed"
                }
                state.data = action.payload;
            })
            .addCase(listInstitutionThunk.rejected, (state) => {
                state.status = {
                    for: "list",
                    state: "error"
                }
            })

            // create assurance company

            .addCase(createInstitutionThunk.pending, (state) => {
                state.status = {
                    for: "create",
                    state: "loading"
                }
            })
            .addCase(createInstitutionThunk.fulfilled, (state:any, action) => {
                state.status = {
                    for: "create",
                    state: "completed"
                }
                state.data.unshift(action?.payload);
            })
            .addCase(createInstitutionThunk.rejected, (state) => {
                state.status = {
                    for: "create",
                    state: "error"
                }
            })

            // update 

            .addCase(updateInstitutionThunk.pending, (state) => {
                state.status = {
                    for: "update",
                    state: "loading"
                }
            })
            .addCase(updateInstitutionThunk.fulfilled, (state:any, action) => {
                state.status = {
                    for: "update",
                    state: "completed"
                }
                state.data.unshift(action?.payload);
            })
            .addCase(updateInstitutionThunk.rejected, (state) => {
                state.status = {
                    for: "update",
                    state: "error"
                }
            })


    }
    
})
export default institutionSlice.reducer;
export const institutionsStatusSelector = (state: any) => state.institution.status;
export const institutionsDataSelector = (state: any) => state.institution.data;
export const insuredCompanySelector = (state:any, code:any)=> state.institution?.data?.find(
    (institution: any)=> institution.codeassureur = code
)
export const singleInstitutionsStatusSelector = (state: any, code: any) => state.institution?.data?.find(
    (institution: any) => institution?.code === code
)
export const singleInsuredCompanySelector = (state:any, code:any)=> state.institution?.data?.find(
    (insuredCompany:any)=> insuredCompany?.code === code
)