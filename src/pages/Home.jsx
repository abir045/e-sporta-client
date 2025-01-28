import React from "react";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import About from "../components/About";
import SubscribeNewsLetter from "../components/SubscribeNewsLetter";
import FeaturedClasses from "../components/FeaturedClasses";
import Testimonials from "../components/Testimonials";
import FeaturedForumPosts from "../components/FeaturedForumPosts";
import Team from "../components/Team";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>E-Sporta | Home</title>
      </Helmet>
      <Banner />
      <Featured />
      <About />
      <SubscribeNewsLetter />
      <FeaturedClasses />
      <Testimonials />
      <FeaturedForumPosts />
      <Team />
    </div>
  );
};

export default Home;
