import { Project, Status, Task } from "../types";
import "../styles/TasksComponent.css";
import TaskTable from "./TaskTable";
import { useEffect, useState } from "react";
import taskService from "../utils/taskService";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setTasks } from "../store/counterReducer";
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';


interface PropsType {
    project: Project;
    deleteProject: (id: string) => void;

}
const TasksComponent = ({ project, deleteProject } : PropsType) => {
    const [ viewedTasks, setViewedTasks ] = useState<Task[]>([])
    const [ status, setStatus ] = useState<Status>('ongoing')
    const [ showCard, setShowCard ] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    
    let tasks = useAppSelector(state => state.counter.tasks)

    useEffect(() => {
        if (tasks.length > 0) {
            const taskData = tasks.filter(task => task.status === status)
            setViewedTasks(taskData)
        }
        else setViewedTasks([])
    }, [tasks, status])
    
    const setTaskStatus = (item: Status) => {
        setStatus(item)
        const taskData = tasks.filter(tasks => tasks.status === item)
        setViewedTasks(taskData)
    }   
  
    const updateTask = async (type: string, value: string, id: string) => {
        try {
            const updatedTasks = tasks.map((task) => {
                if (task.id === id) {
                    if (type === "name") {
                        return { ...task, name: value };
                    } else if (type === "dueDate") {
                        const isoDate = value !== "" ? new Date(value).toISOString() : "";
                        return { ...task, dueDate: isoDate };
                    } else if (type === "status") {
                        return { ...task, status: value as 'todo' | 'ongoing' | 'completed' };
                    }
                }
                return task;
            });
    
            dispatch(setTasks(updatedTasks));
            setViewedTasks(updatedTasks);
    
            const editedTask = updatedTasks.find((task) => task.id === id);
    
            if (editedTask) {
                await taskService.update(editedTask);
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    

    const openModel = () => {
        try {
            const date = new Date();
            const localDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            );
            const dueDate = localDate.toISOString().slice(0, 16);
            const newTask = { 
                name: "",
                dueDate: dueDate,
                project: project.id,
                status: "todo" as Status,
                user: project.user,
                id: ""
            }
            
            saveTask(newTask)

        }
        catch(e) {
            console.log("Error at creating new task", e)
        }

    }

    const saveTask = async (newTask: Task) => {
        try {
            const res = await taskService.create(newTask);
            dispatch(setTasks([res.data, ...tasks]));
            setStatus('todo');
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };
    
    const deleteTask = async (id: string) => {
        try {
    
            if (id && id !== "") {

                await taskService.delete(id)

                let allTasks = tasks.filter(task => task.id !== id)
                dispatch(setTasks(allTasks))
            
            }
        }
        catch(e) {
            console.log("Error at delete task", e)
        }
    }

    const onDeleteProject = async () => {
        try {
            setShowCard(false)
            deleteProject(project.id)
        }
        catch(e) {
            console.log("Error deleting project", e)
        }
    }
    
    return (
        <div className="task">
            <div className="d-flex justify-space-between align-center">
                <h2>{project.name}</h2>
                <div className="d-flex align-center">
                    <button className="new-task-btn d-flex " onClick={() => openModel()}>
                        <AiOutlinePlus style={{ margin:2, fontSize: 14 }}/>
                        <span>New task</span>
                    </button>
                    <div>
                        <button className="dot-btn d-flex align-center" onClick={() => setShowCard(showCard => !showCard)}>
                            <BiDotsVerticalRounded/>
                        </button>
                    </div>
                </div>
            </div>

            {showCard && (
                <div className="card-popup">
                <button onClick={() => onDeleteProject()} className="delete-btn d-flex justify-space-between align-center">
                    <AiOutlineDelete style={{ fontSize: 16, marginRight: 4 }}/>
                    <span>Delete project</span>
                </button>
                </div>
            )}


            <ul className="status-bar">
                <li>
                    <button className={status === 'ongoing' ? 'active-status' : ''} onClick={() => setTaskStatus('ongoing')}>🎯 In progress</button>
                </li>
                <li>
                    <button className={status === 'todo' ? 'active-status' : ''} onClick={() => setTaskStatus('todo')}>🗓 Upcoming</button>
                </li>
                <li>
                    <button className={status === 'completed' ? 'active-status' : ''} onClick={() => setTaskStatus('completed')}>🎉 Done</button>
                </li>
            </ul>
            <TaskTable 
                viewedTasks={viewedTasks} 
                updateTask={updateTask}
                deleteTask={deleteTask}
            />
        </div>
    )
}

export default TasksComponent