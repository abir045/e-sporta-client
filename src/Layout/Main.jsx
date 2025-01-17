import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
import Header from "../components/Navbar";
import FooterNav from "../components/Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <FooterNav />
    </div>
  );
};

export default Main;
