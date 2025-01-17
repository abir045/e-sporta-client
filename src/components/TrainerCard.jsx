import { Button, Card } from "flowbite-react";
import React from "react";

// eslint-disable-next-line react/prop-types
const TrainerCard = ({ item }) => {
  return (
    <div>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={item.profileImage}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.trainerName}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.details}
        </p>
        <p className=" text-gray-700 dark:text-gray-400">
          <span className="font-bold">Years Of Experience:</span>{" "}
          <span className="font-semibold">{item.yearsOfExperience} </span>
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Expertise</span>{" "}
          <span className="font-semibold">{item.expertise}</span>
        </p>
        <ul>
          {item.availableSlots.map((slot, index) => (
            <li className="font-semibold" key={index}>
              {slot}
            </li>
          ))}
        </ul>
        <Button>Know More</Button>
      </Card>
    </div>
  );
};

export default TrainerCard;
