import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isProductModalOpen: false,
    selectedProduct: null,
    isDeleteDialogOpen: false,
};

const uiSlice = createSlice({
    name: "ui",

    initialState,

    reducers: {
        openProductModal: (state) => {
            state.isProductModalOpen = true;
        },

        closeProductModal: (state) => {
            state.isProductModalOpen = false;
            state.selectedProduct = null;
        },

        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },

        openDeleteDialog: (state) => {
            state.isDeleteDialogOpen = true;
        },

        closeDeleteDialog: (state) => {
            state.isDeleteDialogOpen = false;
            state.selectedProduct = null;
        },
    },
});

export const {
    openProductModal,
    closeProductModal,
    setSelectedProduct,
    openDeleteDialog,
    closeDeleteDialog,
} = uiSlice.actions;

export default uiSlice.reducer;
