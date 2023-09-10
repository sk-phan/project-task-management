import { Task } from "../types";
import "../styles/TasksComponent.css";
import TaskTable from "./TaskTable";

interface PropsType {
    projectName: string;
    tasks: Task[];
}
const TasksComponent = ({ projectName, tasks } : PropsType) => {
    return (
        <div>
            <h2>{projectName}</h2>
            <ul className="status-bar">
                <li>🗓 Upcoming</li>
                <li>🎯 In progress</li>
                <li>🎉 Done</li>
            </ul>
            <TaskTable tasks={tasks}/>
        </div>
    )
}

export default TasksComponent