import { Button, Card } from "flowbite-react";
import React, { useState } from "react";

const ForumCard = ({ item }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);

  const renderDescription = () => {
    if (item.desc.length <= 100 || showFullDesc) {
      return item.desc;
    }

    return `${item.desc.slice(0, 100)}...`;
  };

  return (
    <div>
      <Card className="h-full">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {renderDescription()}
          {item.desc.length > 100 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-green-500 ml-2 hover:underline"
            >
              {showFullDesc ? "Show Less" : "Read More"}
            </button>
          )}
        </p>
      </Card>
    </div>
  );
};

export default ForumCard;
