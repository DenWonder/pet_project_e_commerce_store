import { configureStore, legacy_createStore } from "@reduxjs/toolkit";
import counterReducer, { counterSlice } from "../../features/contact/counterReducer";
import { useDispatch, useSelector } from "react-redux";
import {catalogApi} from "../../features/catalog/catalogApi.ts";
import {uiSlice} from "../layout/uiSlice.ts";
import {errorApi} from "../../features/about/errorApi.ts";
import {basketApi} from "../../features/basket/basketApi.ts";
import {catalogSlice} from "../../features/catalog/catalogSlice.ts";
import {accountApi} from "../../features/account/accountApi.ts";
import {checkoutApi} from "../../features/checkout/checkoutApi.ts";
import {orderApi} from "../../features/orders/orderApi.ts";

export function configureTheStore(){
    return legacy_createStore(counterReducer);
}

export const store = configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [basketApi.reducerPath]: basketApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
        [checkoutApi.reducerPath]: checkoutApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer,
        catalog: catalogSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            catalogApi.middleware, 
            errorApi.middleware,
            basketApi.middleware,
            accountApi.middleware,
            checkoutApi.middleware,
            orderApi.middleware,
        )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()