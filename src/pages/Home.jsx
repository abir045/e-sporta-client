import React from "react";
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import About from "../components/About";
import SubscribeNewsLetter from "../components/SubscribeNewsLetter";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <About />
      <SubscribeNewsLetter />
    </div>
  );
};

export default Home;
