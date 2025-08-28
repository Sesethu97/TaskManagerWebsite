import React, { useEffect, useState } from "react";
import TaskInfo from "../../components/TaskInfoSlide/TaskInfo";
import CreateTaskForm from "../../components/CreateTask/CreateTaskForm";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://localhost:7183/api/Task")
      .then((res) => res.json())
      .then((data) => {
        console.log("Tasks fetched:", data);
        setTasks(data);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const getTasksByStatus = (status) => {
    const statusMap = {
      "To Do": "todo",
      "In Progress": "inprogress",
      "On Hold": "onhold",
      Complete: "complete",
    };

    return tasks.filter((task) => task.status === statusMap[status]);
  };

  const columns = [
    { title: "To Do", status: "To Do" },
    { title: "In Progress", status: "In Progress" },
    { title: "On Hold", status: "On Hold" },
    { title: "Complete", status: "Complete" },
  ];
  const statusColors = {
    "To Do": "bg-blue-100 text-blue-700",
    "In Progress": "bg-yellow-100 text-yellow-800",
    "On Hold": "bg-orange-100 text-orange-800",
    Complete: "bg-green-100 text-green-700",
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const createForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-16 mt-4 w-[calc(100%-4rem)] h-full">
      <div className="p-6  max-h-svh">
        <h2 className="text-2xl flex justify-center  text-teal-900 font-bold mb-6">
          All Tasks
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.status} className="flex flex-col">
              <div
                className={`h-[30px] w-full rounded-md shadow flex items-center justify-center font-semibold ${
                  statusColors[col.status]
                }`}
              >
                {col.title}
              </div>

              {col.status === "To Do" && (
                <>
                  <button
                    className="mt-2 w-full bg-teal-600 text-white rounded-md px-2 py-1 text-sm hover:bg-teal-700"
                    onClick={createForm}
                  >
                    + Add Task
                  </button>
                </>
              )}
              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-teal-900 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
                    <CreateTaskForm onClose={() => setIsOpen(false)} />
                  </div>
                </div>
              )}
              {isOpen && <CreateTaskForm onClose={() => setIsOpen(false)} />}
              <div className="mt-2 flex-1 bg-gray-100 rounded-md p-2">
                {getTasksByStatus(col.status).map((task) => (
                  <div
                    key={task.id}
                    className="bg-white shadow p-2 mb-2  h-24 flex items-center justify-center cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div className="justify-start">
                      <div className="font-semibold text-sm truncate">
                        {task.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TaskInfo
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
        onUpdate={(updatedTask) => {
          setTasks((prev) =>
            prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          );
          setSelectedTask(updatedTask);
        }}
      />
    </div>
  );
}

export default Home;
