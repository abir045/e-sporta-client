import { Button, Card, Radio } from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const TrainerBooking = () => {
  const location = useLocation();
  const { trainer, selectedSlot } = location.state || {};
  const [selectedPackage, setSelectedPackage] = useState("basic");

  console.log(trainer, selectedSlot);

  const membershipPackages = [
    {
      id: "basic",
      name: "Basic Membership",
      price: 10,
      benefits: [
        "Access to gym facilities during regular operating hours",
        "Use of cardio and strength training equipment",
        "Access to locker rooms and showers",
      ],
    },
    {
      id: "standard",
      name: "Standard Membership",
      price: 50,
      benefits: [
        "All benefits of the basic membership",
        "Access to group fitness classes such as yoga, spinning, and Zumba",
        "Use of additional amenities like a sauna or steam room",
      ],
    },
    {
      id: "premium",
      name: "Premium Membership",
      price: 100,
      benefits: [
        "All benefits of the standard membership",
        "Access to personal training sessions with certified trainers",
        "Discounts on additional services such as massage therapy or nutrition counseling",
      ],
    },
  ];

  const getSelectedPackageObj = () => {
    return membershipPackages.find((pkg) => pkg.id === selectedPackage);
  };

  const handlePackageChange = (packageId) => {
    setSelectedPackage(packageId);
  };

  return (
    <div>
      <h2 className="text-center font-bold text-3xl my-10">Booking</h2>

      <div className="flex justify-center">
        <Card className="w-full max-w-5xl">
          <div className="flex items-center gap-4">
            <img
              src={trainer.profileImage}
              alt={trainer.trainerName}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-bold">{trainer.trainerName}</h3>
              <p className="text-gray-600">{trainer.expertise}</p>
            </div>
          </div>

          <div>
            <p className="font-bold">Classes:</p>
            <ul>
              {trainer.classes.map((item, index) => (
                <li className="font-semibold" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <p className="font-bold">Selected Time Slot:</p>
            <p className="text-lg">{selectedSlot}</p>
          </div>

          <h3 className="text-2xl font-bold">Select a Package</h3>

          <div className="w-full grid gap-6 mb-8">
            {membershipPackages.map((package_) => (
              <Card key={package_.id} className="w-full">
                <div className="flex items-start gap-4">
                  <Radio
                    id={package_.id}
                    name="membership"
                    checked={selectedPackage === package_.id}
                    onChange={() => handlePackageChange(package_.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor={package_.id}
                        className="text-xl font-bold cursor-pointer"
                      >
                        {package_.name}
                      </label>
                      <span className="text-lg font-bold text-blue-600">
                        ${package_.price}
                      </span>
                    </div>
                    <ul className="list-disc ml-4 text-gray-600">
                      {package_.benefits.map((benefit, index) => (
                        <li key={index} className="mb-1">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Link
            to={"/payment"}
            state={{
              trainer: trainer,
              selectedSlot: selectedSlot,
              ChosenPackage: getSelectedPackageObj(),
            }}
          >
            <Button className="mt-6">Join Now</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default TrainerBooking;

{
  /* <Card className="w-full">
<h4 className="text-xl font-bold mb-4">Booking Summary</h4>
<div className="space-y-2 mb-4">
  <div className="flex justify-between">
    <span>Selected Package:</span>
    <span className="font-semibold">
      {membershipPackages.find(p => p.id === selectedPackage)?.name}
    </span>
  </div>
  <div className="flex justify-between">
    <span>Trainer:</span>
    <span className="font-semibold">{trainer.trainerName}</span>
  </div>
  <div className="flex justify-between">
    <span>Time Slot:</span>
    <span className="font-semibold">{selectedSlot}</span>
  </div>
  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
    <span>Total Amount:</span>
    <span>${getSelectedPackagePrice()}</span>
  </div>
</div>
<Button className="w-full">
  Proceed to Payment
</Button>
</Card> */
}
