import React from "react";
import { FaUser } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div>
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-green-400 pl-4">
          <ul>
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
