import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: trainersData = [] } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });

  return [trainersData];
};

export default useTrainer;
