import { Button, Card, Label, Modal, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AppliedTrainerDetails = () => {
  const trainerData = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(true);
  const [rejectionFeedback, setRejectionFeedback] = useState("");

  console.log(trainerData);

  const trainerInfo = {
    trainerName: trainerData.trainerName,
    email: trainerData.email,
    availableSlots: trainerData.availableSlots,
    details: trainerData.details,
    age: trainerData.age,
    qualification: trainerData.qualification,
    yearsOfExperience: trainerData.yearsOfExperience,
    socialLink: trainerData.socialLink,
    expertise: trainerData.expertise,
    status: "trainer",
    profileImage: trainerData.profileImage,
    role: "trainer",
  };

  const handleAcceptTrainer = (trainerData) => {
    axiosSecure.post("/trainers", trainerInfo).then((res) => {
      if (res.data.insertedId) {
        axiosSecure.delete(`/appliedTrainer/${trainerData._id}`);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Trainer created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleRejectTrainer = (trainerData) => {
    const rejectedData = {
      trainerId: trainerData._id,
      trainerEmail: trainerData.email,
      trainerName: trainerData.trainerName,
      feedback: rejectionFeedback,
      rejectedAt: new Date(),
    };
    console.log(rejectedData);
    axiosSecure
      .post("/rejected", rejectedData)
      .then((res) => {
        if (res.data.insertedId) {
          return axiosSecure.delete(`/appliedTrainer/${trainerData._id}`);
        }
      })
      .then(() => {
        setOpenModal(false);
        setRejectionFeedback("");
        Swal.fire({
          position: "top-end",
          icon: "info",
          title: "Trainer application rejected",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-8">Trainer Details</h2>

      <div>
        <Card
          className="max-w-lg mx-auto"
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc={trainerData.profileImage}
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {trainerData.trainerName}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 flex gap-2 items-center">
            <MdEmail className="text-2xl" /> {trainerData.email}
          </p>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            {trainerData.details}
          </p>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Age:</span> {trainerData.age}
          </p>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold">Qualification:</span>{" "}
            {trainerData.qualification}
          </p>

          <p className="font-normal  dark:text-gray-400">
            <span className="font-bold ">years Of Experience</span>{" "}
            {trainerData.yearsOfExperience}
          </p>

          <p className="font-bold">Available Slots:</p>
          <div className="flex flex-col gap-6">
            <ul>
              {trainerData.availableSlots.map((item, index) => (
                <li key={index} className="font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="font-bold">Expertise:</p>
          <ul>
            {trainerData.expertise.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <p className="font-normal  dark:text-gray-400">
            <span className="font-bold ">Role:</span> {trainerData.role}
          </p>

          <div className="flex justify-between">
            <Button onClick={() => handleAcceptTrainer(trainerData)}>
              Confirmation
            </Button>
            <Button onClick={() => handleOpenModal(trainerData)}>Reject</Button>
          </div>
        </Card>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Trainer Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <Card
              className="max-w-lg mx-auto"
              imgAlt="Meaningful alt text for an image that is not purely decorative"
              imgSrc={trainerData.profileImage}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {trainerData.trainerName}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400 flex gap-2 items-center">
                <MdEmail className="text-2xl" /> {trainerData.email}
              </p>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                {trainerData.details}
              </p>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Age:</span> {trainerData.age}
              </p>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                <span className="font-bold">Qualification:</span>{" "}
                {trainerData.qualification}
              </p>

              <p className="font-normal  dark:text-gray-400">
                <span className="font-bold ">years Of Experience</span>{" "}
                {trainerData.yearsOfExperience}
              </p>

              <p className="font-bold">Available Slots:</p>
              <div className="flex flex-col gap-6">
                <ul>
                  {trainerData.availableSlots.map((item, index) => (
                    <li key={index} className="font-semibold">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-bold">Expertise:</p>
              <ul>
                {trainerData.expertise.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <p className="font-normal  dark:text-gray-400">
                <span className="font-bold ">Role:</span> {trainerData.role}
              </p>

              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Your message" />
                </div>
                <Textarea
                  value={rejectionFeedback}
                  onChange={(e) => setRejectionFeedback(e.target.value)}
                  name="rejectionFeedback"
                  id="comment"
                  placeholder="Leave a comment..."
                  required
                  rows={4}
                />
              </div>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleRejectTrainer(trainerData)}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AppliedTrainerDetails;
