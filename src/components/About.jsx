import React from "react";
import trainer1 from "../assets/trainer1.jpg";

const About = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  max-w-7xl mx-auto gap-6 px-5">
      <div>
        <h4 className="text-xl">About Us</h4>
        <h2 className="text-3xl mt-4">We Help To Get Fitness Goal</h2>
        <p className="mt-6 w-3/4">
          Welcome to E-Sporta, where fitness meets community and results are our
          priority. We offer a wide range of classes tailored to all fitness
          levels, from high-energy group sessions to calming yoga flows. Our
          certified trainers are passionate about helping you achieve your
          goals, whether you are just starting out or looking to push your
          limits. With personalized programs designed to suit your needs, we’re
          here to guide you every step of the way. At E-Sporta, we believe in
          building a supportive environment where you can challenge yourself,
          stay motivated, and thrive. Join us and take the first step toward a
          healthier, stronger you!
        </p>
      </div>

      <div className="w-full">
        <img
          className="rounded-lg w-full h-full object-cover"
          src={trainer1}
          alt=""
        />
      </div>
    </div>
  );
};

export default About;
