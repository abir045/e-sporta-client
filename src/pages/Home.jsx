import React from "react";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import About from "../components/About";
import SubscribeNewsLetter from "../components/SubscribeNewsLetter";
import FeaturedClasses from "../components/FeaturedClasses";
import Testimonials from "../components/Testimonials";
import FeaturedForumPosts from "../components/FeaturedForumPosts";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <About />
      <SubscribeNewsLetter />
      <FeaturedClasses />
      <Testimonials />
      <FeaturedForumPosts />
    </div>
  );
};

export default Home;
