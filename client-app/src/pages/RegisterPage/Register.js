import Register from "../../components/RegisterForm/SignUp";

function SignUp() {
  return (
    <div className="w-full px-2">
      <div className="p-6 rounded-md bg-slate-300 max-h-svh">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-semibold">
            <Register />
          </h2>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
