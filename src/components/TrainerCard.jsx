import { Button, Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const TrainerCard = ({ item }) => {
  return (
    <div>
      <Card
        className="px-5"
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
        {/* <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Expertise</span>{" "}
          <span className="font-semibold">{item.expertise}</span>
        </p> */}

        <p className="font-bold text-gray-700 dark:text-gray-400">Expertise:</p>
        <ul>
          {item.expertise.map((item, index) => (
            <li className="font-semibold" key={index}>
              {item}
            </li>
          ))}
        </ul>

        <ul>
          {item.availableSlots.map((slot, index) => (
            <li className="font-semibold" key={index}>
              {slot}
            </li>
          ))}
        </ul>

        <p>
          {" "}
          <Link to={item.socialLink}>
            {/* <Button className="bg-gray-600"> */}
            <FaFacebook className="text-2xl" />
            {/* </Button> */}
          </Link>
        </p>
        <Link to={`/alltrainers/${item._id}`}>
          <Button>Know More</Button>
        </Link>
      </Card>
    </div>
  );
};

export default TrainerCard;
