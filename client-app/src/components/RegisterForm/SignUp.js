import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);

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
        navigate("/user-profile");

        console.log(data);
      } else {
        const err = await response.text();
        alert("Error: " + err);
      }
    } catch (error) {
      console.error(error);
      alert("Network error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 text-center font-bold">
          <div className="text-teal-900">
            <h2 className="text-3xl ">Create an account</h2>
          </div>
          <div className=" text-teal-950 text-xs">
            Already have an account?{" "}
            <Link to="/login">
              <span className="font-bold">Login</span>
            </Link>
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 block text-teal-900 text-sm font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full rounded-2xl border text-teal-900 border-teal-900 bg-teal-50 p-2.5 text-sm"
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="mb-2 text-teal-900 block text-sm font-medium"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full rounded-2xl border text-teal-900 border-teal-900 bg-teal-50 p-2.5 text-sm"
            required
            autoComplete="email"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-teal-900 text-sm font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full rounded-2xl border text-teal-900 border-teal-900 bg-teal-50 p-2.5 text-sm"
            required
            autoComplete="current-password"
          />
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-teal-900  bg-teal-900 border-teal-900 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-checkbox"
            className="ms-2 text-sm font-medium text-teal-900 dark:text-teal-900"
          >
            I agree to the Terms and Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mx-auto block w-1/2 rounded-2xl border border-pin text-white bg-teal-900 hover:bg-slate-700 p-2.5 text-sm disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
