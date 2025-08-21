import React from "react";

function TaskInfo({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-1/2 bg-teal-900 h-full shadow-xl transform transition-transform duration-100 translate-x-0">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold text-white text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            x
          </button>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default TaskInfo;
