// import React from "react";
import { useTasksState } from "../../context/task/context";
import TaskDetails from "./TaskDetails";
import { useParams } from "react-router-dom";

const TaskDetailsContainer = () => {
  let { taskID } = useParams();
  const taskListState = useTasksState();
  const isFetchingTasks = taskListState.isLoading;
  const selectedTask = taskListState.projectData.tasks?.[taskID || ""];
  // We will render a loader based on the status,
  // We make sure, the tasks have been fetched, project is a valid one.
  if (isFetchingTasks) {
    return <>Loading...</>;
  }
  if (!selectedTask) {
    return <>No such task!</>;
  }

  return <TaskDetails />;
};

export default TaskDetailsContainer;