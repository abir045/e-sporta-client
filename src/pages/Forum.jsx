import React, { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ForumPageCard from "../components/ForumPageCard";

const Forum = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: forumPosts = {} } = useQuery({
    queryKey: ["Featured-posts", currentPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forum/paginated?page=${currentPage}`);

      return res.data;
    },
    keepPreviousData: true,
  });

  console.log(forumPosts);

  const { posts, totalPages } = forumPosts;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-10">Forum Page</h2>

      <div className="grid grid-cols-1 gap-10 max-w-7xl mx-auto">
        {posts?.map((item) => (
          <ForumPageCard key={item._id} item={item} />
        ))}
      </div>

      <div className="pagination flex justify-center my-20">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "text-green-500 border border-green-600 px-2 mx-5 font-bold"
                : ""
            }
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Forum;
