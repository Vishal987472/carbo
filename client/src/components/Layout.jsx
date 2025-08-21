import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ onLogout }) => {
  return (
    <>
      <Navbar onLogout={onLogout} />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
