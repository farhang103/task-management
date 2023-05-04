type Board = {
    id: number;
    name: string;
    columns: Column[];
}

type Column = {
    id: number;
    name: string;
    color: string;
    tasks: Task[];
};

type Task = {
    id: number;
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
};

type Subtask = {
    id: number;
    title: string;
    isCompleted: boolean;
};
