import { useEffect, useState } from "react"
import ProjectSideBar from "../components/ProjectsSideBar"
import { Project, Task } from "../types"
import projectService from "../utils/projectService"
import '../styles/ProjectView.css'
import TasksComponent from "../components/TasksComponent"
import taskService from "../utils/taskService"

const ProjectView = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    
    useEffect(() => {

        projectService.getAll()
        .then((res) => {
            if (res.data) {
                setProjects(res.data); 
            }
        })
        .catch((error) => {
            console.error('Error fetching projects:', error);
        });
    }, [])

    useEffect(() => {
        if (projects.length > 0) {
            taskService.getAll(projects[1].id)
            .then((res) => {
                if (res.data) {
                    setTasks(res.data)
                }
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
        }
    }, [projects])
    
    return (
        <div className="container">
            <div className="projects-container white-bg">
                {projects.map((project) => (
                    <ProjectSideBar key={project.id} project={project} />
                ))}
            </div>

            {projects.length > 0 && <div className="tasks-container">
                <TasksComponent 
                projectName={projects[1].name}
                tasks={tasks}
                />
            </div>}
        </div>
    )
}

export default ProjectView