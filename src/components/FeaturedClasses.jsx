import React from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import FeaturedClassCard from "./FeaturedClassCard";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredClasses = [], refetch } = useQuery({
    queryKey: ["Featured"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes/popular");
      return res.data;
    },
  });

  console.log(featuredClasses);
  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Featured Classes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6">
        {featuredClasses.map((item) => (
          <FeaturedClassCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedClasses;
