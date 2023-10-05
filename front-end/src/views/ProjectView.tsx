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
import {BsPlus} from 'react-icons/bs';
import {BiSearch} from 'react-icons/bi';
import { useNavigate } from "react-router"
import NewTaskModal from "../components/NewTaskModal"

const ProjectView = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [projectIndex, setProjectIndex] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchedProjects, setSearchedProjects] = useState<Project[]>([])
    const [showProjectModal, setShowProjectModal] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const allProjects = [...projects]
        
        if (searchValue !== "") {
            const lowerCaseSearch = searchValue.toLowerCase()
            const filteredProjects = allProjects.filter(project => project.name.toLowerCase().includes(lowerCaseSearch))
            setSearchedProjects(filteredProjects)
        }
        else {
            setSearchedProjects(projects)
        }
    }, [projects, searchValue])

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (searchedProjects.length > 0) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedProjects,projectIndex])

    const setCurrentProject = (id: string) => {
        
        const index = projects.findIndex(project => project.id === id)

        if (index !== -1) {
            dispatch(setProject(searchedProjects[index]))
            setProjectIndex(index)
        }
    }

    const deleteProject = async (id: string) => {
        try {
            const projectLength = searchedProjects.length

            await projectService.delete(id)
            setProjects(projects => projects.filter(project => project.id !== id))

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
            navigate('/')
        }
        catch(e){
            console.log("Error logout", e)
        }
    }

    const closeTaskModal = (name: string) => {

        setShowProjectModal(false)

        if (name !== "") {
            projectService.create(name)
            .then(res => {
                setProjects(projects => [res.data, ...projects])
                setProjectIndex(0)
            })
        }
    }

    const updateProject = async (updatedProject: Project) => {
        try {
            await projectService.update(updatedProject)

            setProjects(projects => projects.map(project => {
                if (project.id === updatedProject.id) {
                    return updatedProject
                }
                else return project
            }))
        }
        catch(e) {
            console.log("Error at updating project", e)
        }
    }

    return (
        <div className="container">
            <div className="projects-container d-flex flex-column ">
                <div style={{flex: 11}}>
                <div className="d-flex align-center">
                    <div className="input-container">
                        <BiSearch/>
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <button className="plus-btn" onClick={() => setShowProjectModal(true)}>
                        <BsPlus />
                    </button>
                </div>
                { searchedProjects.map((project, index) => (
                    <ProjectSideBar 
                        key={project.id} 
                        project={project} 
                        setIndex = {setCurrentProject}
                        saveProjectName={updateProject}
                        deleteProject= {deleteProject}
                    />
                ))}
                </div>
                <div className="logout-section d-flex align-center">
                    <button className="d-flex align-center logout-btn" onClick={() => logOut()}>
                        <FiLogOut style={{ marginRight: 12 }}/>
                        Log out
                    </button>
                </div>
            </div>

            {projects[projectIndex] && <div className="tasks-container">
                <TasksComponent 
                project={projects[projectIndex]}
                deleteProject = {deleteProject}
                />
            </div>}

            {
                showProjectModal && <NewTaskModal closeModal={closeTaskModal}/>
            }
        </div>
    )
}

export default ProjectView