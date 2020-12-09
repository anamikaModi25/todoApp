import { LoginSuccessState, LoginState, UserRegistration, User } from "../../Login/State/state";
import { todoSplitApi } from "../../Utils/RTKQuery";

export const loginApi = todoSplitApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<LoginSuccessState, Partial<LoginState>>({
            query:(body) => ({
                url: "/user/login",
                method: "POST",
                body: body
            }),
            invalidates: ["TODO"]
        }),
        signup: build.mutation<LoginSuccessState, Partial<UserRegistration>>({
            query: (body) => ({
                url: "/user/register",
                method: "POST",
                body: body
            })
        }),
        userDetail: build.mutation<User, void>({
            query: () => ({
                url: "/user/me"
            })
        })
    })
})

// export const { useLoginMutation, useSignupMutation, useUserDetailQuery } = loginApi;