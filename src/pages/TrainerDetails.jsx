import { Button, Card } from "flowbite-react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useLocation } from "react-router-dom";

const TrainerDetails = () => {
  const data = useLoaderData();
  const location = useLocation();

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
  const { selectedClass } = location.state || {};
  return (
    <div className="flex flex-col items-center">
      <Helmet>
        <title>E-Sporta | Trainer Details</title>
      </Helmet>
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
            {/* <span className="font-semibold">{expertise}</span> */}
          </p>
          <ul>
            {expertise.map((item, index) => (
              <li className="font-semibold" key={index}>
                {item}
              </li>
            ))}
          </ul>
          <p className="font-bold">Classes:</p>
          <ul>
            {classes?.map((item, index) => (
              <li className="font-semibold" key={index}>
                {item}
              </li>
            ))}
          </ul>

          <p className="font-bold">Available Slots:</p>
          <div className="flex flex-col gap-6">
            {availableSlots?.map((item, index) => (
              <Link
                key={index}
                to={"/booking"}
                state={{
                  trainer: data,
                  selectedSlot: item,
                  selectedClass: selectedClass,
                }}
              >
                <Button className="font-semibold">{item}</Button>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mt-10">Be a Trainer</h2>
        <Link to={"/becomeTrainer"}>
          <Button className="mt-10 w-full">Become a Trainer</Button>
        </Link>
      </div>
    </div>
  );
};

export default TrainerDetails;
