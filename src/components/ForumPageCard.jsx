import { Card } from "flowbite-react";
import React from "react";

const ForumPageCard = ({ item }) => {
  return (
    <div>
      <Card className="">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
        <p>{item.email}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {item.desc}
        </p>
      </Card>
    </div>
  );
};

export default ForumPageCard;
