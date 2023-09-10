import api from "./api"
import { Task } from "../types";

const taskService = {
    getAll(projectId: string) {
        return api.get<Task[]>('/tasks/' + projectId);
    },
};

export default taskService;
