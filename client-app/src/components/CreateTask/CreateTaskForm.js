import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTaskForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    description: "",
    priority: "",
    duedate: "",
    assignedUser: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setFormData((prev) => ({
      ...prev,
      duedate: date ? date.toISOString() : "",
    }));
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const users = [
    { id: 1, name: "Alice", email: "alice@email.com", password: "1234" },
    { id: 2, name: "Bob", email: "bob@email.com", password: "1234" },
    { id: 3, name: "Charlie", email: "charlie@email.com", password: "1234" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.assignedUser) {
      alert("Please select a user to assign the task to.");
      return;
    }

    const selectedUser = users.find(
      (u) => u.id === parseInt(formData.assignedUser)
    );

    if (!selectedUser) {
      alert("Invalid user selected.");
      return;
    }

    const payload = {
      Title: formData.title,
      Description: formData.description,
      Status: formData.status,
      Priority: formData.priority,
      DueDate: formData.duedate,
      AssignedUserId: parseInt(formData.assignedUser),
    };

    try {
      const response = await fetch("https://localhost:7183/api/Task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Task created successfully!");
        console.log(data);
        setFormData({
          title: "",
          status: "",
          description: "",
          priority: "",
          duedate: "",
          assignedUser: "",
        });
        setStartDate(new Date());
        setDescription("");
      } else {
        const err = await response.text();
        alert("Error: " + err);
        console.log(err);
      }
    } catch (error) {
      console.error(error);
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-start pt-8 h-full overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 shadow-2xl shadow-black mb-10 rounded-md"
      >
        <div className="mb-5 flex justify-center font-bold">
          <h2>Task Creation</h2>
        </div>

        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium">
            Task Name
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label htmlFor="status" className="block mb-2 text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="">Select status</option>
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="onhold">On Hold</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium"
            >
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label htmlFor="date" className="block mb-2 text-sm font-medium">
              Due Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="assignedUser"
              className="block mb-2 text-sm font-medium"
            >
              Assign To
            </label>
            <select
              id="assignedUser"
              value={formData.assignedUser}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="">Select user</option>
              <option value="1">Alice</option>
              <option value="2">Bob</option>
              <option value="3">Charlie</option>
            </select>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium"
          >
            Description
          </label>
          <ReactQuill
            theme="snow"
            onChange={handleDescriptionChange}
            value={description}
            placeholder="Describe the task in detail..."
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/3 p-2.5"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTaskForm;
