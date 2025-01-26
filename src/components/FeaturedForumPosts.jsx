import React from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ForumCard from "./ForumCard";

const FeaturedForumPosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredPosts = [], refetch } = useQuery({
    queryKey: ["Featured-posts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/forum");
      return res.data;
    },
  });

  console.log(featuredPosts);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-20">
        Latest Community posts
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {featuredPosts.slice(-6).map((item) => (
          <ForumCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedForumPosts;
