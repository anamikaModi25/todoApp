import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { assert } from '../../Utils/assert';
import { todoApi } from '../../Utils/RTKQuery';
import { loginApi } from '../../Utils/RTKQuery/loginApi';
import { RootState } from '../../Utils/store';
import { LoginState, LoginSuccessState } from '../State/state';

export const loginAdapter = createEntityAdapter<LoginSuccessState>({
    selectId: (login) => login.user._id,
})

export const getToken =() => {
    let token = localStorage.getItem("token")
    if(token || token !== "SIGNOUT"){
        return token
    }
    else{
        return "SIGNOUT"
    }
}

type SliceState = { state: 'loading'} | {state: 'finished', data: string};

const initialState: LoginSuccessState = {token: "", user: {name: "", email: "", _id: 0}}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(state){
            state.token = "SIGNOUT";
            state.user = initialState.user;
            localStorage.setItem("token", "SIGNOUT");
        }
    },
    extraReducers: (builder) => {     
        builder
        .addMatcher(
            loginApi.endpoints.login.matchFulfilled,
            (state, {payload}) => {
                state.token = payload.result.token;
                state.user = payload.result.user;
                localStorage.setItem("token", payload.result.token);
            }
        )
        .addMatcher(
            loginApi.endpoints.login.matchRejected,
            (state, {payload}) => {
                state = initialState
            }
        )
        .addMatcher(
            loginApi.endpoints.userDetail.matchFulfilled,
            (state, {payload}) => {
                state.user = payload.result
            }
        )
    }
})

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.login.user;
export const activeToken = (state: RootState) => state.login.token !== "" ? state.login.token : localStorage.getItem("token");