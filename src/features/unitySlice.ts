import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../Utils/Utils.tsx";


export const createUnityThunk = createAsyncThunk(
    "UNITY/createUnity",
    async (data) => {
        const response = await callApi(true, "unite", "post", null, data)
        return response;
    }
)


export const listUnityThunk = createAsyncThunk(
    "UNITY/listUnity",
    async (id_labo) => {
        const response = await callApi(true, `unitelabo/${id_labo}`, "get", null);
        return response;
    }
)

export const updatUntyThunk = createAsyncThunk(
    "UNITY/updateUnity",
    async (data: any) => {
        const response = await callApi(true, `unite/${data.id}`, "put", null, data.data);
        return response;
    }
)

const initialState = {
    status: "idle",
    data: []
}


const unitySlice = createSlice({
    initialState,
    name: "UNITY",
    reducers: {},
    extraReducers(builder) {
        builder
            //create unity
            .addCase(createUnityThunk.pending, (state) => {
                state.status = "pending"
            })
            .addCase(createUnityThunk.fulfilled, (state, action) => {
                state.status = "success"
                //    if(action?.payload?.data?.success){
                //         state.data.push(action?.payload?.data?.data)
                //    }
            })
            .addCase(createUnityThunk.rejected, (state) => {
                state.status = "error"
            })

            //list all unity
            .addCase(listUnityThunk.pending, (state) => {
                state.status = "loading"
            })
            .addCase(listUnityThunk.fulfilled, (state, action) => {
                state.status = "completed";
                if (action.payload?.data?.success) {
                    state.data = action?.payload.data?.data;
                }

            })
            .addCase(listUnityThunk.rejected, (state) => {
                state.status = "error"
            })

            //update unity

            .addCase(updatUntyThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updatUntyThunk.fulfilled, (state, action) => {
                state.status = "completed";
                // state.data = action.payload
            })
            .addCase(updatUntyThunk.rejected, (state) => {
                state.status = "error"
            })
    }

})

export default unitySlice.reducer;
export const singleUnitySelector = (state, id) =>
    state.unity?.data?.find((unity) => unity?.id === id);