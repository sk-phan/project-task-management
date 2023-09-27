import { Task } from "../types"
import "../styles/TaskTable.css"
import taskService from "../utils/taskService"
import { useEffect, useState } from "react"

interface Props {
    tasks: Task[]
}

const TaskTable = ({ tasks } : Props) => {

    const [ taskItems, setTaskItems ] = useState<Task[]>(tasks)

    useEffect(() => setTaskItems(tasks), [tasks])
    
    const onUpdateTask = (type: string, value: string, id: string) => {
        const updatedTasks = taskItems.map((task) => {
            if (task.id === id) {
              if (type === "name") {
                return { ...task, name: value };
              }
            }
            return task;
          });

        setTaskItems(updatedTasks)

        const editedTask = updatedTasks.find((task) => task.id === id);

        if (editedTask) {

            taskService.update(editedTask)
            .then(res => console.log(res.data))
            .catch(e => console.log(e))
        }
    }

    return (
        <table className="custom-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Due Date</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {taskItems.map((item) => (
                <tr key={item.id}>
                    <td className="field">
                        <input 
                        className="editable-input" 
                        value={item.name} 
                        type="text" 
                        onChange={(e) => onUpdateTask('name', e.target.value, item.id)}/>
                    </td>
                    <td className="field">{new Date(item.dueDate).toLocaleString()}</td>
                    <td className="field">{item.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TaskTable