import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTaskForm() {
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="flex justify-center items-start pt-8 h-full overflow-auto">
      <form className="w-full max-w-3xl bg-white p-8 shadow-2xl shadow-black mb-10 rounded-md">
        <div className="mb-5 flex justify-center font-bold  ">
          <h2>Task Creation</h2>
        </div>
        <div className="mb-5">
          <label
            for="taskname"
            className="block mb-2 text-sm font-medium dark:text-black"
          >
            Task Name
          </label>
          <input
            type="taskname"
            id="taskname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2 text-sm font-medium dark:text-black"
            >
              Status
            </label>
            <select
              id="priority"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="onhold">On Hold</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="priority"
              className="block mb-2 text-sm font-medium dark:text-black"
            >
              Priority
            </label>
            <select
              id="priority"
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
            <label
              for="duedate"
              className="block mb-2 text-sm font-medium dark:text-black"
            >
              Due Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              id="date"
              dateFormat="yyyy/MM/dd"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="assignedUser"
              className="block mb-2 text-sm font-medium dark:text-black"
            >
              Assign To
            </label>
            <select
              id="assignedUser"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
            className="block mb-2 text-sm font-medium dark:text-black"
          >
            Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="bg-gray-50"
            placeholder="Describe the task in detail..."
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-100 border   border-gray-300 text-gray-900 text-sm rounded-lg block w-1/3 p-2.5"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
export default CreateTaskForm;
