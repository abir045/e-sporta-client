import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const SubscribeNewsLetter = () => {
  const axiosPublic = useAxiosPublic();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email);

    const userInfo = {
      Name: name,
      Email: email,
    };

    axiosPublic.post("/newsletterSubscribers", userInfo).then((res) => {
      if (res.data.insertedId) {
        console.log("user added to the newsletter subscription");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are subscribed to the newsletter successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
      }
    });
  };
  return (
    <div className="bg-[#155E75] flex flex-col items-center max-w-7xl mx-auto mt-20 px-5">
      <div>
        <h2 className="my-10 font-bold text-3xl text-white">
          Subscribe To Our Newsletter
        </h2>
      </div>
      <div className="w-full max-w-lg">
        <form onSubmit={handleSubscribe} className="flex  flex-col gap-4 mb-10">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                value="Your Name"
                className="font-bold text-white"
              />
            </div>
            <TextInput
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email1"
                value="Your email"
                className="font-bold text-white"
              />
            </div>
            <TextInput
              name="email"
              id="email1"
              type="email"
              placeholder="your email"
              required
            />
          </div>

          <Button type="submit">Subscribe Now</Button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeNewsLetter;
