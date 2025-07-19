import React from "react";
import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBar from "../../components/owner/SideBar";

const Layout = () => {
  return (
    <div className="flex flex-col">
      <NavbarOwner />
      <div className="flex flex-col md:flex-row ">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
