import { Status, Task } from "../types";
import "../styles/TasksComponent.css";
import TaskTable from "./TaskTable";
import { useEffect, useState } from "react";

interface PropsType {
    projectName: string;
    tasks: Task[];
}
const TasksComponent = ({ projectName, tasks } : PropsType) => {
    const [ viewedTasks, setViewedTasks ] = useState<Task[]>([])
    const [ status, setStatus ] = useState<Status>('ongoing')

    useEffect(() => {
        if (tasks.length > 0) {
            const taskData = tasks.filter(task => task.status === "ongoing")
            setViewedTasks(taskData)
        }
    }, [tasks])
    
    const setTaskStatus = (item: Status) => {
        setStatus(item)
        const taskData = tasks.filter(tasks => tasks.status === item)
        setViewedTasks(taskData)
    }   

    return (
        <div>
            <h2>{projectName}</h2>
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
            <TaskTable tasks={viewedTasks}/>
        </div>
    )
}

export default TasksComponent