import React from "react";
import { Banner, Button } from "flowbite-react";
import hero from "../assets/hero.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import { Link } from "react-router-dom";

const HeroBanner = () => {
  return (
    <div>
      <div className=" w-full mb-0 border-gray-200  p-4 dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto relative  ">
          <img
            className="rounded-lg w-full h-[600px] object-cover"
            src={hero4}
            alt=""
          />
          <div className="absolute top-[35%] left-[15%]">
            <h3 className="text-white text-4xl">Keep Training</h3>
            <p className="text-white text-xl mt-10">
              Whether your aim is to loose weight, tone up, gain weight we can
              put together a gym program specially tailored for you.
            </p>

            <Link to={"/classes"}>
              <Button className="mt-10">classes</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
