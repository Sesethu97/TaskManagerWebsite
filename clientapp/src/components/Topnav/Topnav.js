import { useState } from "react";

function Topnav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="TopNav hidden md:block">
      <nav className="sticky top-0 mt-2 z-30  border-b rounded-md border-gray-200   bg-slate-300 ml-18">
        <div className="max-w-screen-2xl  px-4 flex justify-end ">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="px-3 py-1 border rounded text-sm bg-white text-gray-700 hover:drop-shadow-lg"
                type="button"
              >
                STATUS▾
              </button>
              {isDropdownOpen && (
                <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>Important</li>
                    <li>To-Do</li>
                    <li>In Progress</li>
                    <li>On-Hold</li>
                    <li>Complete</li>
                  </ul>
                </div>
              )}

              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Tasks"
                  className="block w-full pl-10 pr-3 py-2 text-sm border rounded-lg bg-white focus:ring-2 focus:ring-slant-100 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Topnav;
