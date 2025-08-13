import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Topbar from "./components/TopNav/Topbar";
import Sidebar from "./components/SideNav/Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-20">
        <div className="h-16 mb-4 px-2">
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
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
