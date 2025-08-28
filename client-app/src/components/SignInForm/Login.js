import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((s) => ({ ...s, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetch("https://localhost:7183/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (!res.ok) {
        const msg = data?.message || data?.error || text || "Login failed";
        throw new Error(msg);
      }

      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/home");
      } else {
        throw new Error("Invalid login response from server");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 text-center font-bold">
          <h2 className="text-3xl text-teal-900">Welcome</h2>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
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
            className="mb-2 block text-sm text-teal-900 font-medium"
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
          <Link to="/forgot-password" className="underline text-teal-900">
            I forgot my password
          </Link>
          <Link to="/register" className="underline text-teal-900">
            Create account
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mx-auto block w-1/2 rounded-2xl border border-pin text-white bg-teal-900 hover:bg-slate-700 p-2.5 text-sm disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
