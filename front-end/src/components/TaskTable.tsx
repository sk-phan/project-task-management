import { Task } from "../types"
import "../styles/TaskTable.css"

interface Props {
    tasks: Task[]
}

const TaskTable = ({ tasks } : Props) => {

    const onChangeTaskName = (name: string) => {

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
                {tasks.map((item) => (
                <tr key={item.id}>
                    <td className="field">
                        <input 
                        className="editable-input" 
                        value={item.name} 
                        type="text" 
                        onChange={(e) => onChangeTaskName(e.target.value)}/>
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