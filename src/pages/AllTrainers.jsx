import React from "react";
import useTrainer from "../hooks/useTrainer";
import TrainerCard from "../components/TrainerCard";
import { Helmet } from "react-helmet-async";

const AllTrainers = () => {
  const [trainersData] = useTrainer();
  console.log(trainersData);
  return (
    <div>
      <Helmet>
        <title>E-Sporta | All Trainers</title>
      </Helmet>
      <h2 className="text-3xl mt-10 mb-10 text-center font-bold">
        ALL TRAINERS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {trainersData.map((item) => (
          <TrainerCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
