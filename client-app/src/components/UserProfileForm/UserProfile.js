import { useState, useEffect } from "react";

function UserProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://localhost:7183/api/Auth/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phonenumber: data.phoneNumber || "",
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("https://localhost:7183/api/User/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phonenumber,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to update user");
      }

      const updatedUser = await res.json();
      // Update localStorage with new info
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating profile: " + err.message);
    } finally {
      setLoading(false);
    }
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-slate-300"
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
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg text-sm font-medium bg-slate-900 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
