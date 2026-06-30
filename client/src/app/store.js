import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { productApi } from "../features/api/productApi";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);
