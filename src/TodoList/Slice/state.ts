export interface AddTaskState {
    description: string;
}

export interface TaskData {
    description: string;
    completed: boolean;
    _id: string
}

export interface Task {
    count: number;
    data: TaskData[]
}

export interface TaskSuccess {
        success: boolean;
        data: TaskData
}