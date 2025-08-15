import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Taskmanagerwallper from "../../images/taskamanagaerwallpaper.png";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const payload = {
      identifier: formData.identifier,
      password: formData.password,
    };

    try {
      const res = await fetch("https://localhost:7183/api/User/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Login failed";
        try {
          const err = await res.json();
          msg = err?.message || err?.error || JSON.stringify(err);
        } catch {
          msg = await res.text();
        }
        throw new Error(msg);
      }

      const data = await res.json();
      if (data?.token) localStorage.setItem("auth_token", data.token);

      navigate("/");
    } catch (err) {
      setErrorMsg(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-3xl bg-white p-8 shadow-sm shadow-black rounded-md">
        <div className="mb-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 flex justify-center font-bold">
              <h2 className="text-2xl">Welcome</h2>
            </div>

            {errorMsg && (
              <div className="mb-4 text-sm text-red-600">{errorMsg}</div>
            )}

            <div className="mb-5">
              <label
                htmlFor="identifier"
                className="block mb-2 text-sm font-medium"
              >
                Email/Username
              </label>
              <input
                type="text"
                id="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                autoComplete="username"
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
                autoComplete="current-password"
              />
            </div>

            <div className="flex items-center mb-4 justify-between text-sm">
              <Link to="/forgot-password" className="underline">
                I forgot my password
              </Link>
              <Link to="/register" className="underline">
                Create account
              </Link>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/3 p-2.5 disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign In"}
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

export default SignIn;
