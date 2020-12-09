import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { taskApi } from '../../Utils/RTKQuery/taskApi';
import { RootState } from '../../Utils/store';
import { Task, TaskData, TaskSuccess } from './state';

// export const taskAdapter = createEntityAdapter<TaskSuccess>({
//     selectId: (login) => login.data._id,
// })


// type SliceState = { state: 'loading'} | {state: 'finished', data: string};

const initialState: Task = {count: 0, data: []}

const taskSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {     
        builder
        .addMatcher(
            taskApi.endpoints.getTask.matchFulfilled,
            (state, {payload}) => {
                state.data = payload.result.data;
                state.count = payload.result.count;
                // console.log(payload, "fa")
            }
        )
        .addMatcher(
            taskApi.endpoints.addTask.matchFulfilled,
            (state, {payload}) => {
                state.data.push(payload.result.data)
            }
        )
        .addMatcher(
            taskApi.endpoints.updateTask.matchFulfilled,
            (state, {payload}) => {
                let index = state.data.findIndex((data) => data._id === payload.result.data._id)
                if(index > -1){
                    state.data[index] = payload.result.data
                }
            }
        )
        .addMatcher(
            taskApi.endpoints.deleteTask.matchFulfilled,
            (state, {payload}) => {
                console.log(payload)
            }
        )
    }
})


export default taskSlice.reducer;
export const allTasks = (state: RootState) => state.task.data;
