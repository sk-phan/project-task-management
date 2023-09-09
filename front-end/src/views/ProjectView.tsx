import { useEffect, useState } from "react"
import ProjectSideBar from "../components/ProjectsSideBar"
import { Project } from "../types"
import projectService from "../utils/projectService"
import '../styles/ProjectView.css'

const ProjectView = () => {
    const [projects, setProjects] = useState<Project[]>([])
    
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
    
    return (
        <div className="container">
            <div className="projects-container white-bg">
                {projects.map((project) => (
                    <ProjectSideBar key={project.id} project={project} />
                ))}
            </div>
            <div className="tasks-container"></div>
        </div>
    )
}

export default ProjectView