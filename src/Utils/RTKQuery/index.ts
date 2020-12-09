import {ApiWithInjectedEndpoints, createApi, fetchBaseQuery} from "@rtk-incubator/rtk-query";
import { TODOAPP_API } from "../../Configuration/Global";
import { RootState } from "../store";

export const todoSplitApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: TODOAPP_API, 
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).login.token === "" ? localStorage.getItem("token"): (getState() as RootState).login.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
              }
              return headers;
        }
    }),
    entityTypes: ["TODO"],
    endpoints: () => ({})
})

export const todoApi = todoSplitApi as ApiWithInjectedEndpoints<
typeof todoSplitApi,
[
    typeof import("./loginApi").loginApi
]
>