import React from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCheckTrainer = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isTrainer, isPending: isTrainerLoading } = useQuery({
    queryKey: [user?.email, "isTrainer"],
    enabled: !loading,
    queryFn: async () => {
      console.log("checking isTrainer", user);
      const res = await axiosSecure.get(`/users/checkTrainer/${user?.email}`);
      console.log(res.data);
      return res.data?.trainer;
    },
  });

  return [isTrainer, isTrainerLoading];
};

export default useCheckTrainer;
