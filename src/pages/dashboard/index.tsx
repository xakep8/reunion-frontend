import { useTasksState } from "../../context/task/context";

export default function Dashboard() {
    const taskData = useTasksState();
    const totalTasks = taskData.projectData.tasks.length;
    const completedTasks = Array.isArray(taskData.projectData.tasks) ? taskData.projectData.tasks.filter((task) => task.completed).length : 0;
    console.log(totalTasks, completedTasks);

    return (
        <div>
            <h1>Dashboard</h1>
            <h4>Summary</h4>
            <div className="flex gap-x-5">
            </div>
        </div>
    );
}