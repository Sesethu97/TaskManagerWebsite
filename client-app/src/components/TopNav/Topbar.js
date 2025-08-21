import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Topbar({ onStatusChange }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const modalRef = useRef(null);
  const modalFirstRef = useRef(null);

  const statuses = [
    "All Tasks",
    "Important",
    "To-Do",
    "In Progress",
    "On-Hold",
    "Complete",
  ];

  useEffect(() => {
    function onDown(e) {
      if (!menuRef.current || !menuOpen) return;
      if (
        !menuRef.current.contains(e.target) &&
        !(btnRef.current && btnRef.current.contains(e.target))
      ) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && firstMenuItemRef.current) firstMenuItemRef.current.focus();
  }, [menuOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        if (profileOpen) setProfileOpen(false);
        if (menuOpen) setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [profileOpen, menuOpen]);

  useEffect(() => {
    if (profileOpen && modalFirstRef.current) modalFirstRef.current.focus();
  }, [profileOpen]);

  useEffect(() => {
    function onDown(e) {
      if (!profileOpen) return;
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [profileOpen]);

  function handleSelect(status) {
    setSelectedStatus(status);
    setMenuOpen(false);
    if (typeof onStatusChange === "function") {
      onStatusChange(status);
    }
  }

  return (
    <div className="hidden md:block">
      <nav className="sticky top-0 z-30 border-b border-teal-200 bg-teal-900 ml-14">
        <div className="max-w-screen-2xl px-4 flex justify-end">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  ref={btnRef}
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  className="px-3 py-1 border h-9  rounded-lg text-sm bg-white text-gray-700 hover:drop-shadow-lg"
                >
                  {selectedStatus ? `${selectedStatus} ▾` : "STATUS ▾"}
                </button>

                {menuOpen && (
                  <div
                    ref={menuRef}
                    role="menu"
                    aria-label="Status menu"
                    className="absolute top-full mt-2 left-0 w-44 rounded-xl border bg-white shadow-lg p-1 z-50"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      {statuses.map((s, i) => (
                        <li key={s} className="px-1">
                          <button
                            ref={i === 0 ? firstMenuItemRef : null}
                            onClick={() => handleSelect(s)}
                            className={
                              "w-full text-left px-3 py-2 rounded transition-colors " +
                              (selectedStatus === s
                                ? "bg-teal-100 font-semibold"
                                : "hover:bg-gray-100")
                            }
                            role="menuitem"
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
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

export default Topbar;
