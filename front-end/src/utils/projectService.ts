import api from "./api"
import { Project } from "../types";

const projectService = {
    getAll() {
        return api.get<Project[]>('/projects');
    },
    getOne(projectId: string) {
        return api.get('/projects/' +  projectId)
    },
    create(name: string) {
        return api.post('/projects', { name })
    },
    update(project: Project) {
        return api.put('projects/update/' + project.id, project )
    },
    delete(projectId: string) {
        return api.delete('projects/delete/' + projectId)
    }
};

export default projectService;
