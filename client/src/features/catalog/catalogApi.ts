import {createApi} from "@reduxjs/toolkit/query/react";
import type {Product} from "../../app/models/product.ts";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import type {ProductParams} from "../../app/models/productParams.ts";
import {filterEmptyValues} from "../../../lib/util.ts";

export const catalogApi = createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchProducts: builder.query<Product[], ProductParams>({
            query:(productParams) => {
                return {
                    url: 'products',
                    params: filterEmptyValues(productParams)
                }
            }
        }),
        fetchProductDetails: builder.query<Product, number>({
            query: (productId) => `products/${productId}`
        }),
        fetchFilters: builder.query<{brands: string[], types: string[]}, void>({
            query: () => 'products/filters'
        })
    })
});

export const { useFetchProductDetailsQuery, useFetchProductsQuery, useFetchFiltersQuery } = catalogApi;