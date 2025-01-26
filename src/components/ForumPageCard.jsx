import { Card } from "flowbite-react";
import React, { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForumPageCard = ({ item }) => {
  //   const [voteCount, setVoteCount] = useState(null); // Assuming `votes` is a field in the post
  const [userVote, setUserVote] = useState(null);
  const axiosPublic = useAxiosPublic();

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpvote = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (userVote === "up") return; // Prevent double upvotes
    try {
      await axiosPublic.post(`/forum/${item._id}/upvote`);
      //   setVoteCount((prev) => prev + (userVote === "down" ? 2 : 1)); // Adjust count based on current vote
      setUserVote("up");
    } catch (err) {
      console.error("Failed to upvote", err);
    }
  };

  const handleDownvote = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (userVote === "down") return; // Prevent double downvotes
    try {
      await axiosPublic.post(`/forum/${item._id}/downvote`);
      //   setVoteCount((prev) => prev - (userVote === "up" ? 2 : 1)); // Adjust count based on current vote
      setUserVote("down");
    } catch (err) {
      console.error("Failed to downvote", err);
    }
  };

  return (
    <div>
      <Card className="">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
        <p>{item.email}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.desc}
        </p>
        <div className="flex items-center mt-4">
          <button
            onClick={handleUpvote}
            className={`px-2 py-1 mr-2 border rounded ${
              userVote === "up" ? "bg-green-500 text-white" : "border-gray-300"
            }`}
          >
            <FaLongArrowAltUp />
          </button>
          <span className="text-lg font-bold">{item?.upvote}</span>
          <button
            onClick={handleDownvote}
            className={`px-2 py-1 ml-2 border rounded ${
              userVote === "down" ? "bg-red-500 text-white" : "border-gray-300"
            }`}
          >
            <FaLongArrowAltDown />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ForumPageCard;
