import { Project } from "../types"
import '../styles/ProjectsSideBar.css'

interface PropsType {
    project: Project;
    index: number;
    setIndex:  (id: string) => void;
}


const ProjectSideBar = ({ project, index, setIndex } : PropsType) => {
    return (
        <div className="project-name-card" onClick={() => setIndex(project.id)}>
            <span>{project.name}</span>
        </div>
    )
}

export default ProjectSideBar