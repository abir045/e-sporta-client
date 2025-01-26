import React from "react";
import useTrainer from "../hooks/useTrainer";
import TrainerCard from "./TrainerCard";

const Team = () => {
  const [trainersData] = useTrainer();

  console.log(trainersData);

  return (
    <div>
      <h2 className="text-center my-10 font-bold text-2xl">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6">
        {trainersData.slice(-3).map((item) => (
          <TrainerCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Team;
