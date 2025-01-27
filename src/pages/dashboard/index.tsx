import { useEffect,useState } from "react";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { refreshTasks } from "../../context/task/actions";

export default function Dashboard() {
    const taskData = useTasksState();
    const taskDispatch = useTasksDispatch();
    const [totalTasks,setTotalTasks] = useState(0);
    const [completedTasks,setCompletedTasks] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            await refreshTasks(taskDispatch);
            const tasks = Object.values(taskData.projectData.tasks);
            if (tasks.length > 0) {
                setTotalTasks(tasks.length);
                setCompletedTasks(tasks.filter((task: any) => task.completed).length);
            }
            setIsLoading(false);
        };
        fetchTasks();
    }, [taskDispatch, taskData.projectData.tasks]);

    if(isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2 className="mt-4 text-xl">Summary</h2>
            <div className="flex gap-x-5">
                <div className=" p-4 rounded-md w-1/3">
                    <h3 className="text-lg">Total Tasks</h3>
                    <p className="text-2xl font-bold">{totalTasks}</p>
                </div>
                <div className=" p-4 rounded-md w-1/3">
                    <h3 className="text-lg">Completed Tasks</h3>
                    <p className="text-2xl font-bold">{(completedTasks * 100) / totalTasks}%</p>
                </div>
                <div className=" p-4 rounded-md w-1/3">
                    <h3 className="text-lg">Pending Tasks</h3>
                    <p className="text-2xl font-bold">{(totalTasks - completedTasks)*100/totalTasks}%</p>
                </div>
            </div>
        </div>
    );
}