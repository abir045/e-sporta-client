import React from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classesData = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes");
      return res.data;
    },
  });
  return [classesData];
};

export default useClasses;
