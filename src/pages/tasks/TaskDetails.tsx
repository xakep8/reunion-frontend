/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTasksDispatch, useTasksState } from "../../context/task/context";
import { refreshTasks, updateTaskDetails } from "../../context/task/actions";
import { TaskDetailsPayload } from "../../context/task/types";

type TaskFormUpdatePayload = TaskDetailsPayload & {
  selectedPerson: string;
  commentText: string; // Added commentText to store comment input
};

const formatDateForPicker = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const TaskDetails = () => {
  const taskDispatch = useTasksDispatch();
  const taskListState = useTasksState();
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { taskID } = useParams();
  const navigate = useNavigate();

  // Get the selected task directly from taskListState
  const selectedTask = taskListState.projectData.tasks[taskID ?? ""];

  const { register, handleSubmit, reset } = useForm<TaskFormUpdatePayload>({
    defaultValues: {
      title: selectedTask?.title || "",
      description: selectedTask?.description || "",
      startDate: selectedTask ? formatDateForPicker(selectedTask.startDate) : "",
      endDate: selectedTask ? formatDateForPicker(selectedTask.endDate) : "",
    },
  });

  useEffect(() => {
    const fetchTasks = async () => {
      await refreshTasks(taskDispatch);
      if (taskID && taskListState.projectData.tasks[taskID]) {
        const task = taskListState.projectData.tasks[taskID];
        reset({
          title: task.title,
          description: task.description,
          startDate: formatDateForPicker(task.startDate),
          endDate: formatDateForPicker(task.endDate),
        });
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, [taskDispatch, taskID, reset]);

  const closeModal = () => {
    setIsOpen(false);
    navigate("../all");
  };

  const onSubmit: SubmitHandler<TaskFormUpdatePayload> = (data) => {
    if (selectedTask) {
      updateTaskDetails(taskDispatch, {
        ...selectedTask,
        ...data,
      });
    }
    closeModal();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Task Details
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      type="text"
                      required
                      placeholder="Enter title"
                      id="title"
                      {...register("title", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Enter description"
                      id="description"
                      {...register("description", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                    />
                    <input
                      type="date"
                      required
                      placeholder="Enter start date"
                      id="startDate"
                      {...register("startDate", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                    />
                    <input
                      type="date"
                      required
                      placeholder="Enter end date"
                      id="endDate"
                      {...register("endDate", { required: true })}
                      className="w-full border rounded-md py-2 px-3 my-4 text-white leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                    />
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TaskDetails;
