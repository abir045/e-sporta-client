import React from "react";

import { Footer } from "flowbite-react";
import gym from "../assets/gym.png";

export default function FooterNav() {
  return (
    <div className="mt-[15%]">
      <Footer container className="">
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              href="https://flowbite.com"
              src={gym}
              alt="Flowbite Logo"
              name="E-Sporta"
            />
            <Footer.LinkGroup>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="#" by="E-Sporta™" year={2025} />
        </div>
      </Footer>
    </div>
  );
}

// export default Footer;
