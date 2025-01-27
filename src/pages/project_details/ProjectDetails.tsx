import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useTasksDispatch, useTasksState } from "../../context/task/context";

import DragDropList from "./DragDropList";
import { refreshTasks } from "../../context/task/actions";
// import { useProjectsState } from "../../context/projects/context";

const ProjectDetails = () => {
  const tasksState = useTasksState();
  const taskDispatch = useTasksDispatch();
  useEffect(() => {
    refreshTasks(taskDispatch);
  }, [ taskDispatch]);

  if (tasksState.isLoading) {
    return <>Loading...</>;
  }
  return (
    <>
      <div className="flex justify-between">
        <Link to={`/new`}>
          <button
            id="newTaskBtn"
            className="rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            New Task
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <DragDropList data={tasksState.projectData} />
      </div>
    </>
  );
};

export default ProjectDetails;
