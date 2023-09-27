import { Task } from "../types"
import "../styles/TaskTable.css"
import taskService from "../utils/taskService"
import { useEffect, useState } from "react"

interface Props {
    tasks: Task[];
    updateTask: (type: string, value: string, id: string) => void;
}

const TaskTable = ({ tasks, updateTask } : Props) => {

    const [ taskItems, setTaskItems ] = useState<Task[]>(tasks)

    useEffect(() => setTaskItems(tasks), [tasks])

    const toLocalDateTime = (isoDate: string) => {
        const date = new Date(isoDate);
        const localDate = new Date(
          date.getTime() - date.getTimezoneOffset() * 60000
        );
        return localDate.toISOString().slice(0, 16);
      };

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
                        onChange={(e) => updateTask('name', e.target.value, item.id)}/>
                    </td>
                    <td className="field">
                        <input 
                            className="editable-input" 
                            value={toLocalDateTime(item.dueDate)}
                            type="datetime-local" 
                            onChange={(e) => updateTask('dueDate', e.target.value, item.id)}/>
                    </td>
                    <td className="field">
                    <select
                        className="status-select"
                        value={item.status}
                        onChange={(e) => updateTask("status", e.target.value, item.id)}
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="todo">Todo</option>
                        <option value="completed">Completed</option>
                    </select>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TaskTable