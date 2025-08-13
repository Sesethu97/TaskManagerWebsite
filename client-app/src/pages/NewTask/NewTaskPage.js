import CreateTaskForm from "../../components/CreateTask/CreateTaskForm";

function NewTaskPage() {
  return (
    <div c="w-full px-2">
      <div className="p-6 rounded-md bg-slate-300 max-h-svh">
        <CreateTaskForm />
      </div>
    </div>
  );
}

export default NewTaskPage;
