
export type Status = 'todo' | 'ongoing' | 'completed';


export interface Task {
    name: string;
    dueDate: string;
    project: string;
    status: Status;
    user: string;
    id: string;
}


export interface Project {
    name: string;
    tasks: string[];
    id: string;
    user: string;
}
