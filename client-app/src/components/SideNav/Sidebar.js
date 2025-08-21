import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  const firstMenuItemRef = useRef(null);
  const modalRef = useRef(null);
  const modalFirstRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setFormData({
      name: user.name || "",
      email: user.email || "",
      phonenumber: user.phonenumber || "",
    });
  }, []);

  const initial = (
    formData.name?.trim()?.[0] ||
    formData.email?.trim()?.[0] ||
    "?"
  ).toUpperCase();

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

 
  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-36 h-screen bg-teal-900 border-r border-teal-200 flex flex-col items-center py-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <Link to="/" aria-label="Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712Z" />
                <path d="M19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
              </svg>
            </Link>
            <h2 className="text-sm font-semibold mt-2 text-white">
              TaskManager
            </h2>
          </div>

          <hr className="ml-3 border-teal-100 my-4 w-5/6" />
        </div>

        <nav className="flex-1 w-full px-2">
          <ul className="flex flex-col items-center space-y-6 text-white">
            <li>Overview</li>
            <li>Workloads</li>
            <Link to="/">
              <li>All Tasks</li>
            </Link>

            <li>My Tasks</li>

            <li></li>
          </ul>
        </nav>

        <div className="mt-auto mb-4 relative">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Me
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label="User menu"
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-44 rounded-xl border bg-white shadow-lg ml-12 p-1 z-50"
            >
              <svg
                className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                width="16"
                height="10"
                viewBox="0 0 16 10"
                aria-hidden="true"
              >
                <path d="M8 10 L16 0 H0 Z" fill="white" stroke="#e5e7eb" />
              </svg>

              <button
                ref={firstMenuItemRef}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setProfileOpen(true);
                }}
              >
                See Profile
              </button>

              <Link
                to="/login"
                className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                Log out
              </Link>
            </div>
          )}
        </div>
      </aside>

      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" />

          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md mx-4 rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Your profile</h3>
              <button
                ref={modalFirstRef}
                onClick={() => setProfileOpen(false)}
                className="text-sm px-2 py-1 rounded hover:bg-gray-100"
                aria-label="Close profile"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl">
                {initial}
              </div>
              <div>
                <div className="font-medium text-sm">{formData.name}</div>
                <div className="text-xs text-gray-500">{formData.email}</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link to="/user-profile" onClick={() => setProfileOpen(false)}>
                <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                  Profile Settings
                </button>
              </Link>

              <Link
                to="/login"
                className="w-full rounded-lg bg-red-500 text-white px-4 py-2 text-sm hover:opacity-95"
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                Log out
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
