import {createApi} from "@reduxjs/toolkit/query/react";
import type {Product} from "../../app/models/product.ts";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], void>({
            query:() => ({url: 'products'})
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId) => `products/${productId}`
        }),
    })
});

export const { useFetchProductDetailsQuery, useFetchProductsQuery } = catalogApi;