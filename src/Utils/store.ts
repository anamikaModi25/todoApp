import { configureStore, ConfigureStoreOptions, getDefaultMiddleware } from "@reduxjs/toolkit";
import { todoApi } from './RTKQuery';
import login from '../Login/Slice/loginSlice';
import task from '../TodoList/Slice/taskSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// const middleware = [...getDefaultMiddleware<RootState>(), todoApi];
export const createStore = (
    options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
     [todoApi.reducerPath]: todoApi.reducer,
     login,
     task
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware),
    ...options
  }
)

export const store = createStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;