import React from "react";
import CreateTaskForm from "../../components/CreateTask/CreateTaskForm.js";

function CreateForm() {
  return (
    <div className="w-full px-2">
      <div className="p-6 rounded-md bg-slate-300 max-h-svh">
        <CreateTaskForm />
      </div>
    </div>
  );
}

export default CreateForm;
