import { Card } from "flowbite-react";
import React from "react";

const FeaturedClassCard = ({ item }) => {
  return (
    <div>
      <Card
        className="h-full w-full "
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={item.image}
      >
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.className}
        </h5>
        <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {item.details}
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Total Bookings:</span> {item.bookingCount}
        </p>
      </Card>
    </div>
  );
};

export default FeaturedClassCard;
