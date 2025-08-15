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
    <div className="flex justify-center items-center min-h-screen overflow-auto">
      <div className="justify-center grid grid-cols-2 gap-2 w-full max-w-3xl bg-white p-8 shadow-sm shadow-black mb-10 rounded-md">
        <div className="mb-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 flex justify-center font-bold">
              <h2>Create an account</h2>
            </div>
            <div className="flex justify-center text-sm mb-4">
              <h2>
                Already have an account?
                <Link to="/login">
                  <span className="font-bold ml-2">Login</span>
                </Link>
              </h2>
            </div>

            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
              />
            </div>
            <div>
              <div className="flex items-center mb-4">
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
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-1/3 p-2.5"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="mb-5 flex items-center justify-center">
          <img
            src={Taskmanagerwallper}
            alt="wallpaper"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
