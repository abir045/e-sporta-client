import React from "react";

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
import Header from "../components/Navbar";
import FooterNav from "../components/Footer";

const Main = () => {
  return (
    <div className="">
      <Header />
      <div className="">
        <Outlet />
      </div>

      <FooterNav />
    </div>
  );
};

export default Main;
