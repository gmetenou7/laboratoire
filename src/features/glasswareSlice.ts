import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";


export const createGlasswareThunk = createAsyncThunk("GLASSWARE/createGlassware",
    async (data) => {
        const response = await callApi(true, 'verre', 'post', null, data);
        return response;
    })


export const listGlasswareThunk = createAsyncThunk("GLASSWARE/listGlassware",
    async (matricule_labo) => {
        const response = await callApi(true, `allverre/${matricule_labo}`, 'get', null,);
        return response.data.data
    })

const initialState = {
    status: "idle",
    data: [],
    formState: "idle"
}

const glasswareSlice = createSlice({
    initialState,
    name: "GLASSWARE",
    reducers: {
        openCreateGlasswareForm(state) {
            state.formState = "create";
        },
        openUpdateGlasswareForm(state) {
            state.formState = "update";
        },
        closeGlasswareForm(state) {
            state.formState = "idle";
        }
    },
    extraReducers(builder) {
        builder
            // Create glassware action builder
            .addCase(createGlasswareThunk.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createGlasswareThunk.fulfilled, (state, action) => {
                state.status = "completed";
            })

            .addCase(createGlasswareThunk.rejected, (state) => {
                state.status = "error"
            })
            // list glassware action builder
            .addCase(listGlasswareThunk.pending, (state) => {
                state.status = "loading"
            })

            .addCase(listGlasswareThunk.fulfilled, (state, action) => {
                state.status = "completed";
                state.data = action.payload;
            })

            .addCase(listGlasswareThunk.rejected, (state) => {
                state.status = "error"
            })
    }
})

export default glasswareSlice.reducer;
export const {
    openCreateGlasswareForm,
    closeGlasswareForm
} = glasswareSlice.actions;

export const glasswareStatusSelector = (state: any) => state.glassware.status;
export const singleGlasswareSelector = (state: any, glasswareId: number) => state.glassware.data?.find(
    (item: any) => item.id === glasswareId
)