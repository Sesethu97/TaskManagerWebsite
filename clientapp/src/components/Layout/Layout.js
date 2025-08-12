import React from "react";
import SideNav from "../Sidenav/Sidebar";
import TopNav from "../Topnav/Topnav";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SideNav />

      <div className="flex-1 ml-20">
        <div className="h-16 mb-4 px-2">
          <TopNav />
        </div>
        <div className="pb-8">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
