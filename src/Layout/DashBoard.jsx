import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import {
  FaBalanceScale,
  FaBars,
  FaHome,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { LuLogs } from "react-icons/lu";
import {
  MdAddBox,
  MdAddToPhotos,
  MdBookmarks,
  MdCardMembership,
  MdManageAccounts,
} from "react-icons/md";
import { RiProfileFill, RiUserCommunityFill } from "react-icons/ri";
import { SiGoogleclassroom, SiTrainerroad } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useCheckTrainer from "../hooks/usecheckTrainer";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isTrainer] = useCheckTrainer();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isAdmin && location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/balance" replace />;
  }

  if (isTrainer && location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/manageSlots" replace />;
  }

  if (!isAdmin && !isTrainer && location.pathname === "/dashboard") {
    return <Navigate to="/dashboard/activityLog" replace />;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClasses = ({ isActive }) => `
    flex items-center gap-2 mt-4 transition-colors duration-200
    ${isActive ? "text-white font-bold" : "text-gray-800 hover:text-white"}
  `;

  return (
    <div>
      <div className="lg:hidden bg-green-400 p-4 flex justify-between items-center fixed top-0 w-full z-50">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button
          onClick={toggleMobileMenu}
          className="text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="md:flex min-h-screen">
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
          ></div>
        )}

        {/* dashboard side bar */}
        <div
          // className="lg:w-64 min-h-screen bg-green-400 pl-4"
          className={`lg:w-64 bg-green-400 fixed lg:static inset-y-0 left-0 z-40 transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="px-4 pt-20 lg:pt-4">
            <ul>
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/balance"
                      className="flex items-center gap-2 mt-4"
                    >
                      <FaBalanceScale /> Balance
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="flex items-center gap-2 mt-4"
                      to="/dashboard/newsSubscribers"
                    >
                      <MdCardMembership />
                      All Newsletter subscribers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/trainers"
                      className="flex items-center gap-2 mt-4"
                    >
                      <SiTrainerroad /> All Trainers
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/appliedTrainer"
                      className="flex items-center gap-2 mt-4"
                    >
                      <VscGitStashApply /> Applied Trainer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addNewClass"
                      className="flex items-center gap-2 mt-4"
                    >
                      <MdAddBox /> Add New Class
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addNewForum"
                      className="flex items-center gap-2 mt-4"
                    >
                      <AiOutlineFileAdd /> Add a new Post to Forum
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}

              {isTrainer ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/manageSlots"
                      className="flex items-center gap-2 mt-4"
                    >
                      <MdManageAccounts /> Manage Slots
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/addNewSlot"
                      className="flex items-center gap-2 mt-4"
                    >
                      <MdAddToPhotos /> Add a new Slot
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/addNewForum"
                      className="flex items-center gap-2 mt-4"
                    >
                      <AiOutlineFileAdd /> Add a new Post to Forum
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}

              {!isAdmin && !isTrainer ? (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/activityLog"
                      className="flex items-center gap-2 mt-4"
                    >
                      <LuLogs /> Activity Log
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/profilePage"
                      className="flex items-center gap-2 mt-4"
                    >
                      <RiProfileFill /> Profile Page
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/trainerBooked"
                      className="flex items-center gap-2 mt-4"
                    >
                      <MdBookmarks /> Trainer booked Page
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}

              <hr className="mt-4" />

              <li>
                <NavLink to="/" className="flex items-center gap-2 mt-4">
                  <FaHome /> Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="flex items-center gap-2 mt-4"
                  to={"/alltrainers"}
                >
                  <IoPerson /> All Trainers
                </NavLink>
              </li>

              <li>
                <NavLink className="flex items-center gap-2 mt-4" to="/classes">
                  <SiGoogleclassroom /> All Classes
                </NavLink>
              </li>

              <li>
                {" "}
                <NavLink className="flex items-center gap-2 mt-4" to="/forum">
                  {" "}
                  <RiUserCommunityFill /> Forum
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
