import { todoApi } from ".";
import { AddTaskState, Task, TaskData, TaskSuccess } from "../../TodoList/Slice/state";

export const taskApi= todoApi.injectEndpoints({
    endpoints:(build) => ({
        getTask: build.mutation<Task, void>({
            query: () => ({
                url: "/task"
            })
        }),
        addTask: build.mutation<TaskSuccess, AddTaskState>({
            query: (body) => ({
                url: "/task",
                method: "POST",
                body
            })
        }),
        updateTask: build.mutation<TaskSuccess, Partial<TaskData>>({
            query: ({_id, ...body}) => ({
                url: `/task/${_id}`,
                method: "PUT",
                body
            })
        }),
        deleteTask: build.mutation<TaskSuccess, Partial<TaskData>>({
            query: ({_id}) => ({
                url: `/task/${_id}`,
                method: "DELETE"
            })
        })
    })
})