import { Card } from "flowbite-react";
import React from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const location = useLocation();
  const { trainer, selectedSlot, ChosenPackage, selectedClass } =
    location.state || {};
  const { user } = useAuth();
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

  console.log(trainer, selectedSlot, ChosenPackage);
  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-10">
        Payment Confirmation
      </h2>
      <div>
        <Card className="w-full max-w-4xl mx-auto">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {trainer.trainerName}
          </h5>
          <div className="mt-4">
            <p className="font-bold">Selected Time Slot:</p>
            <p className="text-lg">{selectedSlot}</p>
          </div>

          <div className="mt-4">
            <p className="font-bold">Selected Package:</p>
            <p className="text-lg">{ChosenPackage.name}</p>
          </div>

          <div className="mt-4">
            <p className="font-bold">Selected Class:</p>
            <p className="text-lg">{selectedClass || trainer.classes[0]}</p>
          </div>

          <div className="mt-4">
            <p className="font-bold">Price:</p>
            <p className="text-lg">{ChosenPackage.price}$</p>
          </div>
          <div className="mt-4">
            <p className="font-bold">Your Name:</p>
            <p className="text-lg">{user.displayName}</p>
          </div>

          <div className="mt-4">
            <p className="font-bold">Your Email:</p>
            <p className="text-lg">{user.email}</p>
          </div>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </Card>
      </div>
      {/* payment  */}
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={ChosenPackage.price}
            ChosenPackage={ChosenPackage}
            selectedClass={selectedClass}
            trainerClass={trainer.classes[0]}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
