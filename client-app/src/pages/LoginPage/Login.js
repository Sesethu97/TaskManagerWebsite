import SignIn from "../../components/SignInForm/Login";
import Taskmanagerwallper from "../../images/taskamanagaerwallpaper.png";

function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="flex items-center justify-center px-6 py-12 md:px-16 bg-white">
        <SignIn />
      </section>

      <aside className="relative hidden md:block bg-teal-900 rounded-md">
        <img
          src={Taskmanagerwallper}
          alt="wallpaper"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </aside>
    </div>
  );
}
export default Login;
