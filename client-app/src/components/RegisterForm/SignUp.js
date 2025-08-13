function Register() {
  return (
    <div className="flex justify-center items-start pt-8 h-full overflow-auto">
      <form className="w-full max-w-3xl bg-white p-8 shadow-2xl shadow-black mb-10 rounded-md">
        <div className="mb-5 flex justify-center font-bold  ">
          <h2>Register</h2>
        </div>
        <div className="mb-5">
          <label
            for="username"
            className="block mb-2 text-sm font-medium dark:text-black"
          >
            Username
          </label>
          <input
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label
            for="email"
            className="block mb-2 text-sm font-medium dark:text-black"
          >
            email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="Password"
            className="block mb-2 text-sm font-medium dark:text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="mb-5">
          <label
            for="ConfirmPassword"
            className="block mb-2 text-sm font-medium dark:text-black"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="ConfirmPassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gray-100 border   border-gray-300 text-gray-900 text-sm rounded-lg block w-1/3 p-2.5"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
