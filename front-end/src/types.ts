
export interface Task {
    name: string;
    dueDate: string;
    status: 'todo' | 'ongoing' | 'completed';
    project: string;
    user: string;
    id: string;
}

export interface Project {
    name: string;
    tasks: string[];
    id: string;
    user: string;
}