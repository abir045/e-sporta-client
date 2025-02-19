import React, { useContext, useState } from "react";
import { Button, Navbar } from "flowbite-react";
import { MdFitnessCenter } from "react-icons/md";
import gym from "../assets/gym.png";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Headroom from "react-headroom";

export default function Header() {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  return (
    <Headroom>
      <Navbar fluid rounded className="pt-5">
        <Navbar.Brand href="/" className="flex">
          <img
            src={gym}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          {/* <MdFitnessCenter /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold ml-2 dark:text-white">
            E-Sporta
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {/* <Button>Get started</Button> */}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="pt-4">
          {/* <div className="md:flex lg:items-center  gap-5"> */}
          <NavLink to="/">Home</NavLink>

          <NavLink to={"/alltrainers"}>All Trainers</NavLink>

          <NavLink to="/classes">All Classes</NavLink>
          <NavLink to="/forum">Forum</NavLink>

          {/* <Navbar.Link href="#">Login</Navbar.Link> */}
          {/* <Navbar.Link href="#">Register</Navbar.Link> */}

          {user ? (
            <>
              <span onClick={handleLogOut}>Log Out</span>

              <img
                src={user?.photoURL}
                className="w-10 rounded-full object-cover"
                alt="user image"
              />

              <Link to="/dashboard">Dashboard</Link>
              {/* </div> */}
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Headroom>
  );
}

// const Navbar = () => {
//   return <Header />;
// };

// export default Navbar;

// If the user is logged in,
//  the navbar will show the profile picture, dashboard, and logout button;
//  otherwise, it will show the Login button.
