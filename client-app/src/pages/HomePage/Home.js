import React, { useEffect, useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);

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

  return (
    <div className="ml-16 mt-4 w-[calc(100%-4rem)] h-full">
      <div className="p-6  max-h-svh">
        <h2 className="text-2xl flex justify-center  text-teal-900 font-bold mb-6">
          All Tasks
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.status} className="flex flex-col">
              <div className="bg-white h-[30px] w-full rounded-md shadow flex items-center justify-center font-semibold">
                {col.title}
              </div>
              <div className="mt-2 flex-1 bg-gray-100 rounded-md p-2">
                {getTasksByStatus(col.status).map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-md shadow p-2 mb-2"
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
