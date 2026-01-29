import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import type {User} from "../../app/models/user.ts";
import type {LoginSchema} from "../../../lib/schemas/loginSchema.ts";
import {router} from "../../app/routes/Routes.tsx";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints:(builder) => ({
        login: builder.mutation<void,  LoginSchema>({
            query:(creds) => {
                return {
                    url: 'login?useCookies=true',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try{
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                } catch (e) {
                    console.log(e);
                }
            }
        }),
        register: builder.mutation<void,  object>({
            query:(creds) => {
                return {
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        })   ,
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(['UserInfo']));
                await router.navigate('/');
            }
        })
    })
})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery, useLazyUserInfoQuery} = accountApi;