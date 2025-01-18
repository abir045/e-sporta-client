import { Button, Card } from "flowbite-react";
import React from "react";
import { useLoaderData } from "react-router-dom";

const TrainerDetails = () => {
  const data = useLoaderData();
  const {
    trainerName,
    profileImage,
    yearsOfExperience,
    socialLink,
    availableSlots,
    classes,
    details,
    expertise,
    qualification,
  } = data;
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold my-10">Trainer Details</h2>

      <div>
        <Card
          className="max-w-xl"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={profileImage}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {trainerName}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {details}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Qualification:</span> {qualification}
          </p>
          <p className=" text-gray-700 dark:text-gray-400">
            <span className="font-bold">Years Of Experience:</span>{" "}
            <span className="font-semibold">{yearsOfExperience} </span>
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Expertise:</span>{" "}
            <span className="font-semibold">{expertise}</span>
          </p>
          <p className="font-bold">Classes:</p>
          <ul>
            {classes.map((item, index) => (
              <li className="font-semibold" key={index}>
                {item}
              </li>
            ))}
          </ul>

          <p className="font-bold">Available Slots:</p>
          <div className="flex flex-col gap-6">
            {availableSlots.map((item, index) => (
              <Button className="font-semibold" key={index}>
                {item}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mt-10">Be a Trainer</h2>
        <Button className="mt-10 w-full">Become a Trainer</Button>
      </div>
    </div>
  );
};

export default TrainerDetails;
