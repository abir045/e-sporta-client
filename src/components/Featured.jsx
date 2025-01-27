import { Card } from "flowbite-react";
import React from "react";
import nutrition from "../assets/nutrition.jpg";
import fitness from "../assets/fitness.jpg";
import exercise from "../assets/exercise.jpg";
import yoga from "../assets/yoga.jpg";

const Featured = () => {
  return (
    <div className="mt-20 mb-20">
      <h5 className="text-center text-xl font-bold">Our Services</h5>
      <h3 className="text-center text-3xl font-bold">
        Bring Your Fitness Ideas To Life
      </h3>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <Card
          className="custom-card h-[90%] "
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={nutrition}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            Right Nutrition
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 h-full">
            Tailored to complement your workout routines, this section provides
            expert advice on balanced diets, meal planning, and essential
            nutrients to maximize performance and recovery.
            {/* Whether you are
            aiming to build muscle, lose weight, or maintain a healthy
            lifestyle, our curated nutrition tips, recipes, and personalized
            plans ensure you are eating right to achieve your goals. */}
          </p>
        </Card>
        {/* 2nd card */}
        <Card
          className="custom-card h-[90%]"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={fitness}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            Health & Fitness
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 h-full">
            Achieve your wellness goals with our dedicated Health & Fitness
            feature, designed to keep you motivated and on track. From
            personalized workout plans tailored to your needs to expert advice
            on nutrition and recovery, we provide everything you need for a
            balanced, healthy lifestyle.
            {/* Track your progress with our
            interactive tools, join engaging group classes, and connect with
            professional trainers to elevate your fitness journey. */}
          </p>
        </Card>
        {/* 3rd card */}
        <Card
          className="custom-card h-[90%] "
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={exercise}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            Gym & Exercise
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 h-full ">
            Transform your fitness journey with our comprehensive Gym & Exercise
            feature, tailored to meet your unique goals. Whether you are a
            beginner or an experienced athlete, our state-of-the-art equipment
            and diverse workout options empower you to achieve peak performance.
            {/* Explore expertly crafted exercise routines, from strength training
            and cardio to flexibility and functional fitness. Stay motivated
            with personalized coaching, group classes, and progress tracking
            tools designed to keep you on the path to success. */}
          </p>
        </Card>
        {/* 4th card */}
        <Card
          className="custom-card h-[90%]"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={yoga}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Yoga & Health Motivation
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 h-full ">
            Rediscover balance and inner peace with our Yoga & Health Motivation
            feature, designed to inspire and guide your wellness journey.
            Whether you are a seasoned yogi or just starting, explore a variety
            of yoga practices tailored to all levels, focusing on flexibility,
            strength, and mindfulness.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Featured;
