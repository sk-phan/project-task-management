import { Task } from "../types"
import "../styles/TaskTable.css"

interface Props {
    tasks: Task[]
}

const TaskTable = ({ tasks } : Props) => {

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
                    <td>{item.name}</td>
                    <td>{new Date(item.dueDate).toLocaleString()}</td>
                    <td>{item.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TaskTable