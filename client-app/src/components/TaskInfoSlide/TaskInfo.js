import React, { useState, useEffect } from "react";

function TaskInfo({ isOpen, onClose, task, onUpdate }) {
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    duedate: "",
    priority: "",
    assignedUser: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://localhost:7183/api/User");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        duedate: task.duedate || "",
        priority: task.priority || "",
        assignedUser: task.assignedUser || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (!task) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...formData,
        duedate: formData.duedate ? formData.duedate : null,
      };

      const res = await fetch(
        `https://localhost:7183/api/Task/update/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update task");
      }

      const updatedTask = await res.json();
      onUpdate(updatedTask);
      alert("Task updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating task: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-1/2 bg-teal-900 h-full shadow-xl">
        <div className="p-4 flex justify-between items-center border-b">
          <div className="text-white font-bold capitalize">
            {formData.title} / {formData.status}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={loading}
              className="mr-2 text-white bg-teal-600 px-2 py-1 rounded hover:bg-teal-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={onClose}
              className="text-white w-6 hover:text-teal-200"
            >
              x
            </button>
          </div>
        </div>

        <div className="p-4 text-white space-y-3">
          <h3 className="font-semibold flex justify-center items-center text-white text-2xl relative">
            <input
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="w-2/4 text-center bg-transparent border-none outline-none focus:ring-0"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="absolute right-[0%] w-5 h-5 text-white cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.65-1.65a1.875 1.875 0 112.652 2.652l-1.65 1.65m-2.652-2.652L6.75 15.75l-1.5 4.5 4.5-1.5 10.762-10.762m-2.652-2.652l2.652 2.652"
              />
            </svg>
          </h3>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  ClipRule="evenodd"
                />{" "}
              </svg>
              <strong>Status:</strong>
            </div>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-2/4 text-center bg-transparent border-none outline-none focus:ring-0"
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="onhold">On Hold</option>
              <option value="complete">Complete</option>
            </select>

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6"
              >
                {" "}
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  ClipRule="evenodd"
                />{" "}
              </svg>
              <strong>Priority:</strong>
            </div>
            <select
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-2/4 text-center bg-transparent border-none outline-none focus:ring-0"
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6"
              >
                {" "}
                <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />{" "}
                <path
                  fill-rule="evenodd"
                  d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z"
                  ClipRule="evenodd"
                />{" "}
              </svg>
              <strong>Due Date:</strong>
            </div>
            <input
              type="date"
              id="duedate"
              value={formData.duedate ? formData.duedate.split("T")[0] : ""}
              onChange={handleChange}
              className="w-2/4 text-center bg-transparent border-none outline-none focus:ring-0"
            />

            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6"
              >
                {" "}
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />{" "}
              </svg>
              <strong>Assigned User:</strong>
            </div>
            <select
              id="assignedUser"
              value={formData.assignedUser}
              onChange={handleChange}
              className="w-2/4 text-center bg-transparent border-none outline-none focus:ring-0"
              required
            >
              <option value="">Select user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6"
            >
              {" "}
              <path
                fill-rule="evenodd"
                d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                ClipRule="evenodd"
              />{" "}
              <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />{" "}
            </svg>
            <strong>Description:</strong>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="text-white w-2/4 text-center bg-transparent border-none outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
