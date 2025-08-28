import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Topbar from "./components/TopNav/Topbar";
import Sidebar from "./components/SideNav/Sidebar";
import NewTask from "./pages/NewTask/NewTaskPage";
import UserProfilePage from "./pages/ProfilePage/UserProfilePage";
import Login from "./pages/LoginPage/Login";
import SignUp from "./pages/RegisterPage/Register";
import MyTasks from "./pages/MyTasksPage/MyTasks";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-20">
        <div className="h-16 mb-4">
          <Topbar />
          <div className="pb-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/user-tasks" element={<MyTasks />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
