import React from "react";
import { Login } from "../Login/Component/login";
import { SignUp } from "../Signup/Component/signup";
import { ToDo } from "../TodoList/Component/todo";

interface RouteState {
    path: string,
    exact: boolean,
    component: any
}

export const Route: RouteState[] = [
  
]

export const FreeRoute: RouteState[] = [
    {
        path: "/signup",
        exact: true,
        component: SignUp
    },
    {
        path: "/todo",
        exact: true,
        component: ToDo
    },
    {
        path: "/",
        exact: true,
        component: Login
    }
]