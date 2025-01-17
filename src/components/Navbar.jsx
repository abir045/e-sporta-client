import React from "react";
import { Button, Navbar } from "flowbite-react";
import { MdFitnessCenter } from "react-icons/md";
import gym from "../assets/gym.png";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar fluid rounded className="">
      <Navbar.Brand href="/" className="flex">
        <img src={gym} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        {/* <MdFitnessCenter /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold ml-2 dark:text-white">
          E-Sporta
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>Get started</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#"></Navbar.Link>
        <NavLink to={"/alltrainers"}>All Trainers</NavLink>
        {/* <Navbar.Link href="#">All trainer</Navbar.Link> */}
        <Navbar.Link href="#">All Classes</Navbar.Link>
        <Navbar.Link href="#">Community</Navbar.Link>
        <Navbar.Link href="#">Login</Navbar.Link>
        <Navbar.Link href="#">Register</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

// const Navbar = () => {
//   return <Header />;
// };

// export default Navbar;
