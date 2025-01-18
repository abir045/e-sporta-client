import { Card } from "flowbite-react";
import React from "react";
import useTrainer from "../hooks/useTrainer";
import { key } from "localforage";
import { Link } from "react-router-dom";

const ClassCard = ({ item }) => {
  const [trainersData] = useTrainer();

  const findTrainerData = (trainerName) => {
    return trainersData.find(
      (trainer) =>
        trainer.trainerName.toLowerCase() === trainerName.toLowerCase()
    );
  };

  return (
    <div>
      <Card
        className=""
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={item?.image}
      >
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.className}
        </h3>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.details}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.category}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.duration}
        </p>
        <div>
          {item.trainerName.map((trainerName, index) => {
            const data = findTrainerData(trainerName);
            console.log(data);
            return (
              <div className="flex gap-2" key={data._id}>
                {/* <span>{data.trainerName}</span> */}
                <Link to={`/alltrainers/${data._id}`}>
                  <img
                    className="w-20 h-20 object-cover rounded-full mb-5"
                    src={data.profileImage}
                    alt=""
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default ClassCard;
