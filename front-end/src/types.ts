
export interface Task {
    name: string,
    dueDate: string,
    status: 'todo' | 'ongoing' | 'completed',
    project: string,
    user: string
}

export interface Project {
    name: string;
    tasks: Task[];
    id: string;
}