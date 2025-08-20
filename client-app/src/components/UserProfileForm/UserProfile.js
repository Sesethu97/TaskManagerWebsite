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
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl"
      >
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

        <div className="mb-5">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
            required
          />
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
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
            required
          />
        </div>

        <div className="mb-8">
          <label
            htmlFor="phonenumber"
            className="block mb-2 text-sm font-medium text-slate-700"
          >
            Phone number
          </label>
          <input
            type="text"
            id="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
            required
          />
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
  );
}

export default UserProfile;
