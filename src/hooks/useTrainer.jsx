import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useTrainer = () => {
  const axiosPublic = useAxiosPublic();

  const { data: trainersData = [], refetch } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers");
      return res.data;
    },
  });

  return [trainersData, refetch];
};

export default useTrainer;
