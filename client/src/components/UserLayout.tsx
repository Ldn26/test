import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

function UserLayout() {
  return (
    <div className="min-h-screen bg-background flex   overflow-hidden w-full ">
      <div className="flex-1  border   ">
        <Outlet />
      </div>
    </div>
  );
}


export default UserLayout;
