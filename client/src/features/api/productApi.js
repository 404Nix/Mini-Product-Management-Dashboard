import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",

    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api`,
    }),

    tagTypes: ["Products"],

    endpoints: (builder) => ({
        // Get All Products
        getProducts: builder.query({
            query: (search = "") => ({
                url: "/products",
                params: search ? { search } : {},
            }),

            providesTags: ["Products"],
        }),

        // Create Products
        createProduct: builder.mutation({
            query: (productData) => ({
                url: "/products",
                method: "POST",
                body: productData,
            }),

            invalidatesTags: ["Products"],
        }),

        // Update 
        updateProduct: builder.mutation({
            query: ({ id, productData }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: productData,
            }),

            invalidatesTags: ["Products"],
        }),

        // Delete
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
