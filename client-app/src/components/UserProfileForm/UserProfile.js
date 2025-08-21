import { useState, useEffect } from "react";

function UserProfile() {
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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData));
    console.log("Saved data:", formData);
  };

  const initial = (
    formData.name?.trim()?.[0] ||
    formData.email?.trim()?.[0] ||
    "?"
  ).toUpperCase();

  return (
    <div className="min-h-screen w-full p-4">
      <h2 className="pl-32 text-2xl font-bold mb-8">Profile Settings</h2>

      <div className="w-full h-full flex justify-center">
        <form onSubmit={handleSubmit} className="w-3/4">
          <div className="mb-8 flex items-center gap-4">
            <svg
              className="shrink-0"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="28" r="28" className="fill-slate-800" />
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-white"
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                {initial}
              </text>
            </svg>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-slate-900 truncate">
                {formData.name || "Your name"}
              </h2>
              <p className="text-sm text-slate-600 truncate">
                {formData.email || "you@example.com"}
              </p>
            </div>
          </div>

          <div className="mb-5 relative">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300"
              required
            />
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 mt-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              readOnly
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
              required
            />
          </div>

          <div className="mb-5 relative">
            <label
              htmlFor="phonenumber"
              className="block mb-2 text-sm font-medium text-slate-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-slate-300"
              required
            />
            <svg
              className="w-5 h-5 text-gray-400 hover:text-gray-700 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 mt-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-slate-900 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
