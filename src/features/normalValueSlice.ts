import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from '../Utils/Utils.tsx';


export const createNormalValueThunk = createAsyncThunk("NORMAL_VALUE/createNormalValue",

    async (data) => {
        const response = await callApi(
            true,
            "valeurnormal",
            "post",
            null,
            data
        )
        return response
    }
)

export const updateNormalValueThunk = createAsyncThunk("NORMAL_VALUE/updateNormalValue",

    async (data: any) => {
        const response = await callApi(
            true,
            `valeurnormal/${data?.code}`,
            "put",
            null,
            data.data
        )
        return response
    }
)

export const deleteNormalValueThunk = createAsyncThunk("NORMAL_VALUE/deleteNormalValue",

    async (data: any) => {
        const response = await callApi(
            true,
            `valeurnormal/${data?.code}`,
            "delete",
            null,
        )
        return response
    }
)

const initialState = {
    selected: null,
    data: [],
    status: 'idle'
}

const normalValueSlice = createSlice({
    initialState,
    name: "NORMAL_VALUE",
    reducers: {
        normalValueSelectedReducer(state, action) {
            state.selected = action.payload
        }
    }
});

export default normalValueSlice.reducer

export const {
    normalValueSelectedReducer
} = normalValueSlice.actions