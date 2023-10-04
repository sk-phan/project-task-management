import { Project } from "../types"
import '../styles/ProjectsSideBar.css'
import { BsThreeDots } from 'react-icons/bs';
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface PropsType {
    project: Project;
    setIndex:  (id: string) => void;
    saveProjectName: (project: Project) => void;
}


const ProjectSideBar = ({ project, setIndex, saveProjectName } : PropsType) => {

    const [hoverId, setHoverId] = useState<string>('')
    const [showCard, setShowCard] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [editedName, setEditedName] = useState<string>(project.name)

    const openCard = (e: React.MouseEvent) => {
        e.stopPropagation()
        setShowCard(showCard => !showCard)
    }

    const editName = () => {
        setShowCard(false)
        setIsEditing(true)
    }

    const updateProject = () => {
        setIsEditing(false)

        const updatedProject = {
            ...project,
            name: editedName
        }
        saveProjectName(updatedProject)
    }
    return (
        <div 
            className="project-name-card d-flex align-center justify-space-between" 
            onMouseLeave={() => setHoverId('')}
            onMouseEnter={() => setHoverId(project.id)} 
            onClick={() => setIndex(project.id)}>

            {   isEditing ?
                <input 
                    className="edited-input"
                    type="text"
                    value={editedName} 
                    onBlur={() => updateProject()}
                    onChange={(e) => setEditedName(e.target.value)}/>
                : <span>{project.name}</span>
            }

            {hoverId === project.id && 
                <BsThreeDots style={{ fontSize: 16 }} onClick={(e) => openCard(e)}/>
            }
            {showCard && (
                <div className="card-container d-flex flex-column">
                <button onClick={() => editName()} className="d-flex align-center action-btn">
                    <AiOutlineEdit />
                    <span>Edit</span>
                </button>
                <button className="d-flex align-center action-btn">
                    <AiOutlineDelete/>
                    <span>Delete</span>
                </button>
                </div>
          )}
        </div>
    )
}

export default ProjectSideBar