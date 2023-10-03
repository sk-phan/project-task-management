import { useEffect, useState } from "react"
import ProjectSideBar from "../components/ProjectsSideBar"
import { Project } from "../types"
import projectService from "../utils/projectService"
import '../styles/ProjectView.css'
import TasksComponent from "../components/TasksComponent"
import taskService from "../utils/taskService"
import { useAppDispatch } from "../store/hook"
import { setProject, setTasks } from "../store/counterReducer";
import {FiLogOut } from 'react-icons/fi';
import { useNavigate } from "react-router"

const ProjectView = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [projectIndex, setProjectIndex] = useState(0)
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        projectService.getAll()
        .then((res) => {
            if (res.data) {
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

    const deleteProject = async (id: string) => {
        try {
            const projectLength = projects.length

            await projectService.delete(id)
            const allProjects = projects.filter(project => project.id !== id)
            setProjects(allProjects)

            if (projectIndex === projectLength - 1) {
                setProjectIndex(projectIndex => projectIndex - 1)
            }
            else {
                setProjectIndex(projectIndex => projectIndex + 1)
            }
        }
        catch(e) {
            console.log("Error at deleting project", e)
        }
    }
    
    const logOut = () => {
        try {
            localStorage.clear()
            navigate('/login')
        }
        catch(e){
            console.log("Error logou", e)
        }
    }

    return (
        <div className="container">
            <div className="projects-container d-flex flex-column ">
                <div style={{flex: 11}}>
                {projects.map((project, index) => (
                    <ProjectSideBar key={project.id} project={project} index ={index} setIndex = {setCurrentProject}/>
                ))}
                </div>
                <div className="logout-section d-flex align-center">
                    <button className="d-flex align-center logout-btn" onClick={() => logOut()}>
                        <FiLogOut style={{ marginRight: 12 }}/>
                        Log out
                    </button>
                </div>
            </div>

            {projects.length > 0 && <div className="tasks-container">
                <TasksComponent 
                project={projects[projectIndex]}
                deleteProject = {deleteProject}
                />
            </div>}
        </div>
    )
}

export default ProjectView