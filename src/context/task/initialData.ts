import { ProjectData } from "./types";

const initialData: ProjectData = {
  columns: {
    pending: {
      id: "pending",
      title: "Pending",
      taskIDs: [],
    },
    done: {
      id: "done",
      title: "Done",
      taskIDs: [],
    },
  },
  tasks: {},
  columnOrder: ["pending", "done"],
};

export default initialData;