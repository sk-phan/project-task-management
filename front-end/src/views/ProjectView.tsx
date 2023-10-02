import { useEffect, useState } from "react"
import ProjectSideBar from "../components/ProjectsSideBar"
import { Project, Task } from "../types"
import projectService from "../utils/projectService"
import '../styles/ProjectView.css'
import TasksComponent from "../components/TasksComponent"
import taskService from "../utils/taskService"
import { useAppDispatch } from "../store/hook"
import { setProject, setTasks } from "../store/counterReducer";

const ProjectView = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [projectIndex, setProjectIndex] = useState(0)
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        projectService.getAll()
        .then((res) => {
            if (res.data) {
                console.log(res.data)
                setProjects(res.data); 
                dispatch(setProject(res.data[1]))
            }
        })
        .catch((error) => {
            console.error('Error fetching projects:', error);
        });
    }, [])

    useEffect(() => {
        if (projects.length > 0) {
            taskService.getAll(projects[projectIndex].id)
            .then((res) => {
                if (res.data) {
                    dispatch(setTasks(res.data)); // Dispatch the action to update Redux store
                }
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
        }
    }, [projects,projectIndex])

    const setCurrentProject = (index: number) => {
        dispatch(setProject(projects[index]))
        setProjectIndex(index)
    }
    
    return (
        <div className="container">
            <div className="projects-container">
                {projects.map((project, index) => (
                    <ProjectSideBar key={project.id} project={project} index ={index} setIndex = {setCurrentProject}/>
                ))}
            </div>

            {projects.length > 0 && <div className="tasks-container">
                <TasksComponent 
                project={projects[projectIndex]}
                />
            </div>}
        </div>
    )
}

export default ProjectView