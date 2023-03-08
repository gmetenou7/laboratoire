import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";


 export const listAssuranceContratThunk = createAsyncThunk(
    "ASSURANCECONTRAT/listAssuranceContrat",
    async (data) => {
        const response = await callApi(true, "contratetpassurcli", "post", null, data )
        return response?.data?.data
        
    }
 )

 export const createAssuranceContratThunk = createAsyncThunk(
    "ASSURANCECONTRAT/createAssuranceContrat",
    async (data) => {
        const response = await callApi(true, "contrat", "post", null, data )
        return response
        
    }
 )
 export const updateAssuranceContratThunk = createAsyncThunk(
    "ASSURANCECONTRAT/updateAssuranceContrat",
    async (data:any) => {
        const response = await callApi(true, `contrat/${data?.code}`, "put", null, data?.data )
        return response
        
    }
 )

 const initialState = {
    status: {
        for: "idle",
        state: "idle"
    },
    data: []
 }

 const assuranceContratSlice = createSlice({
    initialState,
    name: "ASSURANCECONTRAT",
    reducers:{},
    extraReducers(builder){
            builder
        //list assurance contract
      .addCase(listAssuranceContratThunk.pending, (state)=>{
                state.status ={
                    for: "list",
                    state: "loading"
                }
        })
        .addCase(listAssuranceContratThunk.fulfilled, (state, action)=>{
            state.status ={
                for:"list",
                state: "completed"
            }
            state.data = action.payload
        })
        .addCase(listAssuranceContratThunk.rejected, (state)=>{
            state.status ={
                for:"list",
                state: "error"
            }
        })

        // create assurance contrat

        .addCase(createAssuranceContratThunk.pending, (state)=>{
            state.status ={
                for: "create",
                state: "loading"
            }
        })
        .addCase(createAssuranceContratThunk.fulfilled, (state, action)=>{
            state.status ={
                for: "create",
                state: "completed"
            }
        })
        .addCase(createAssuranceContratThunk.rejected, (state)=>{
            state.status ={
                for:"create",
                state: "error"
            }
        })

        // update assurance contrat

        .addCase(updateAssuranceContratThunk.pending, (state)=>{
            state.status ={
                for: "update",
                state: "loading"
            }
        })
        .addCase(updateAssuranceContratThunk.fulfilled, (state, action)=>{
            state.status ={
                for: "update",
                state: "completed"
            }
        })
        .addCase(updateAssuranceContratThunk.rejected, (state)=>{
            state.status ={
                for: "update",
                state: "error"
            }
        })
    }
 })

 export default assuranceContratSlice.reducer;
 export const contratStateSelector = (state: any) => state.assuranceContrat.data;
 export const contractStatusSelector = (state: any) => state.assuranceContrat.status;
 export const singleContractStatusSelector = (state, id) =>
    state.assuranceContrat?.data?.find((assuranceContrat) => assuranceContrat?.code === id);