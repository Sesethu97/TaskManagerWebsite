import React, { useState, useEffect } from "react";

function TaskInfo({ isOpen, onClose, task, onUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    duedate: "",
    priority: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        duedate: task.duedate || "",
        priority: task.priority || "",
      });
      setIsEditing(false);
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

      // Convert empty string due date to null
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
      setIsEditing(false);
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

      <div className="relative z-10 w-1/2 bg-teal-900 h-full shadow-xl transform transition-transform duration-100 translate-x-0">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold text-white text-lg">
            {isEditing ? (
              <input
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded px-2 text-black"
              />
            ) : (
              task.title
            )}
          </h3>

          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={loading}
                className="mr-2 text-white bg-green-600 px-2 py-1 rounded hover:bg-green-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mr-2 text-white bg-blue-600 px-2 py-1 rounded hover:bg-blue-700"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-gray-100"
            >
              x
            </button>
          </div>
        </div>

        <div className="p-4 text-white space-y-3">
          <div>
            <strong>Status:</strong>{" "}
            {isEditing ? (
              <select
                id="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded text-black px-2 py-1"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="onhold">On Hold</option>
                <option value="complete">Complete</option>
              </select>
            ) : (
              task.status
            )}
          </div>

          <div>
            <strong>Description:</strong>{" "}
            {isEditing ? (
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded px-2 py-1 text-black"
              />
            ) : (
              task.description
            )}
          </div>

          <div>
            <strong>Due Date:</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                id="duedate"
                value={formData.duedate ? formData.duedate.split("T")[0] : ""}
                onChange={handleChange}
                className="rounded px-2 py-1 text-black"
              />
            ) : task.duedate ? (
              task.duedate.split("T")[0]
            ) : (
              "-"
            )}
          </div>

          <div>
            <strong>Priority:</strong>{" "}
            {isEditing ? (
              <input
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="rounded px-2 py-1 text-black"
              />
            ) : (
              task.priority || "-"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskInfo;
