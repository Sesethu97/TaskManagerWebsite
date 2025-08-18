import { useState } from "react";
import Taskmanagerwallper from "../../images/taskamanagaerwallpaper.png";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name: formData.name,
      Email: formData.email,
      Password: formData.password,
    };

    try {
      const response = await fetch("https://localhost:7183/api/User/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User created successfully!");
        console.log(data);
      } else {
        const err = await response.text();
        alert("Error: " + err);
      }
    } catch (error) {
      console.error(error);
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 text-center font-bold">
          <h2 className="text-3xl">Welcome</h2>
        </div>

        <div className="mb-5">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="identifier"
            value={formData.name}
            onChange={handleChange}
            className="block w-full rounded-2xl border border-gray-300 bg-gray-50 p-2.5 text-sm"
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-2xl border border-gray-300 bg-gray-50 p-2.5 text-sm"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full rounded-2xl border border-gray-300 bg-gray-50 p-2.5 text-sm"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree to the Terms and Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          className="mx-auto block w-1/2 rounded-2xl border border-pin text-white bg-black hover:bg-slate-700 p-2.5 text-sm disabled:opacity-60"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
