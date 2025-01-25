import React from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaBalanceScale, FaHome, FaUser } from "react-icons/fa";
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
import { SiTrainerroad } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      <div className="flex max-w-7xl mx-auto">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-green-400 pl-4">
          <ul>
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
                to="/dashboard/users"
              >
                {" "}
                <FaUser /> All Users
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
              <NavLink className="flex items-center gap-2 mt-4" to="/community">
                <RiUserCommunityFill /> Community
              </NavLink>
            </li>
          </ul>
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
