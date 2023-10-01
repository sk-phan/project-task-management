import { Status, Task } from "../types";
import "../styles/TasksComponent.css";
import TaskTable from "./TaskTable";
import { useEffect, useState } from "react";
import taskService from "../utils/taskService";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { setTasks } from "../store/counterReducer";

interface PropsType {
    projectName: string;
}
const TasksComponent = ({ projectName } : PropsType) => {
    const [ viewedTasks, setViewedTasks ] = useState<Task[]>([])
    const [ status, setStatus ] = useState<Status>('ongoing')

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.counter.tasks)

    useEffect(() => {
        if (tasks.length > 0) {
            const taskData = tasks.filter(task => task.status === status)
            setViewedTasks(taskData)
        }
    }, [tasks, status])
    
    const setTaskStatus = (item: Status) => {
        setStatus(item)
        const taskData = tasks.filter(tasks => tasks.status === item)
        setViewedTasks(taskData)
    }   
  
    const updateTask = (type: string, value: string, id: string) => {
        
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
              if (type === "name") {
                return { ...task, name: value };
              }
              else if (type === "dueDate") {
                const isoDate = new Date(value).toISOString();
                return { ...task, dueDate: isoDate };
              }
              else if (type === "status") {
                return { ...task, status: value as 'todo' | 'ongoing' | 'completed'}; 
            }
            }
            return task;
          });

          console.log(updatedTasks)
    
          dispatch(setTasks(updatedTasks))
          setViewedTasks(updatedTasks)
          
        const editedTask = updatedTasks.find((task) => task.id === id);

        if (editedTask) {

            taskService.update(editedTask)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
        }
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
            <TaskTable viewedTasks={viewedTasks} updateTask={updateTask}/>
        </div>
    )
}

export default TasksComponent