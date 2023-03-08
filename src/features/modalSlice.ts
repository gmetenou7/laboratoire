import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    active: boolean,
    header: string,
    body: any,
    use_footer: boolean,
    footer_content: any
}

const initialState = <ModalState>{
    active: false,
    header: "Contextual window",
    body: null,
    use_footer: false,
    footer_content: null
}

const modalSlice = createSlice({
    name: "MODAL",
    initialState,
    reducers: {
        showModalReducer(state, action) {
            state.active = true;
            state.header = action?.payload?.header;
            state.body = action?.payload?.body;
            state.use_footer = action.payload.use_footer;
            state.footer_content = action.payload.footer_content;
        },
        closeModalReducer(state) {
            state.active = false;
            state.header = "Contextual window";
            state.body = null;
            state.use_footer = false;
            state.footer_content = null

        }
    }
})

export const { showModalReducer, closeModalReducer } = modalSlice.actions;
export default modalSlice.reducer;