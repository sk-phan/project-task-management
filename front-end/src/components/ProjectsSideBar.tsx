import { Project } from "../types"
import '../styles/ProjectsSideBar.css'

interface PropsType {
    project: Project;
}


const ProjectSideBar = ({ project } : PropsType) => {
    return (
        <div className="project-name-card">
            <span>{project.name}</span>
        </div>
    )
}

export default ProjectSideBar