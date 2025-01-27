import { API_ENDPOINT } from "../../config/constants";
import {
  TaskDetailsPayload,
  TaskListAvailableAction,
  TasksDispatch,
} from "./types";
import { ProjectData } from "./types";
import { TaskDetails } from "./types";

export const addTask = async (
dispatch: TasksDispatch, _p0: string, task: TaskDetailsPayload) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.CREATE_TASK_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    dispatch({ type: TaskListAvailableAction.CREATE_TASK_SUCCESS });
    refreshTasks(dispatch);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: TaskListAvailableAction.CREATE_TASK_FAILURE,
      payload: "Unable to create task",
    });
  }
};
export const reorderTasks = (dispatch: TasksDispatch, newState: ProjectData)  => {
  dispatch({type: TaskListAvailableAction.REORDER_TASKS, payload: newState})
}
export const refreshTasks = async (
  dispatch: TasksDispatch,
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.FETCH_TASKS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/tasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    // extract the response body as JSON data
    const data = await response.json();
    dispatch({
      type: TaskListAvailableAction.FETCH_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: TaskListAvailableAction.FETCH_TASKS_FAILURE,
      payload: "Unable to load tasks",
    });
  }
};
export const deleteTask = async (
dispatch: TasksDispatch, _p0: string, task: TaskDetails) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.DELETE_TASKS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/tasks/${task.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    dispatch({ type: TaskListAvailableAction.DELETE_TASKS_SUCCESS });
    refreshTasks(dispatch);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: TaskListAvailableAction.DELETE_TASKS_FAILURE,
      payload: "Unable to delete task",
    });
  }
};

export const updateTask = async (
  dispatch: TasksDispatch,
  task: TaskDetails
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    // Display loading status
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/tasks/${task.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    // Display success and refresh the tasks
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_SUCCESS });
    refreshTasks(dispatch);
  } catch (error) {
    console.error("Operation failed:", error);
    // Display error status
    dispatch({
      type: TaskListAvailableAction.UPDATE_TASK_FAILURE,
      payload: "Unable to update task",
    });
  }
};

export const updateTaskDetails = async (
  dispatch: TasksDispatch,
  task: TaskDetails
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/tasks/${task.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(task),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update task state");
    }
    dispatch({ type: TaskListAvailableAction.UPDATE_TASK_SUCCESS });
    refreshTasks(dispatch);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: TaskListAvailableAction.UPDATE_TASK_FAILURE,
      payload: "Unable to update task state",
    });
  }
}