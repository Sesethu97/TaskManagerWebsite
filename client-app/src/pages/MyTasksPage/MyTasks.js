import { useEffect, useState } from "react";

function MyTasks() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("https://localhost:7183/api/Auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, [token]);

  useEffect(() => {
    if (!user || !token) return;

    fetch(`https://localhost:7183/api/Task/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error fetching tasks");
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [user, token]);

  return (
    <div className="ml-16 mt-4 w-[calc(100%-4rem)] h-full">
      <div className="p-6 max-h-svh">
        <h2 className="text-2xl flex justify-center text-teal-900 font-bold mb-6">
          My Tasks
        </h2>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-teal-50">
            <thead className="text-xs text-teal-50 uppercase bg-teal-900">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Assigned to</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Priority</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className=" text-teal-900 bg-white border-b border-gray-200"
                  >
                    <td className="px-6 py-4">{task.title}</td>
                    <td className="px-6 py-4">{user?.name}</td>
                    <td className="px-6 py-4">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No date"}
                    </td>
                    <td className="px-6 py-4">{task.status}</td>
                    <td className="px-6 py-4">{task.priority}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    No tasks assigned to you
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyTasks;
