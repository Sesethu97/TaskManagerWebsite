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
      <aside className="fixed top-0 left-0 z-40 w-20 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <div className="mb-6">
          <Link to="/" aria-label="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 mb-6 text-black"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712Z" />
              <path d="M19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
          </Link>
        </div>

        <nav className="flex-1 w-full px-2">
          <ul className="flex flex-col items-center space-y-6">
            <li>
              <Link to="/new-task">
                <button className="p-2 rounded hover:bg-gray-100 hover:drop-shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                    />
                  </svg>
                </button>
              </Link>
            </li>

            <li>
              <button className="p-2 rounded hover:bg-gray-100 hover:drop-shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM15.75 3a3 3 0 0 0-3 3v2.25a3 3 0 0 0 3 3H18a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-2.25ZM6 12.75a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h2.25a3 3 0 0 0 3-3v-2.25a3 3 0 0 0-3-3H6ZM17.625 13.5a.75.75 0 0 0-1.5 0v2.625H13.5a.75.75 0 0 0 0 1.5h2.625v2.625a.75.75 0 0 0 1.5 0v-2.625h2.625a.75.75 0 0 0 0-1.5h-2.625V13.5Z" />
                </svg>
              </button>
            </li>

            <li>
              <Link to="/user-profile">
                <button className="p-2 rounded hover:bg-gray-100 hover:drop-shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto mb-4 relative">
          <button
            ref={btnRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                Profile
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
              <button className="w-full rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                Edit profile
              </button>
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
