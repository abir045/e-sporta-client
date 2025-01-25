import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import {
  Button,
  Label,
  Modal,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

const TrainerBooked = () => {
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(true);
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [currentTrainer, setCurrentTrainer] = useState("");
  const { user } = useAuth();

  const { data: payments = [] } = useQuery({
    queryKey: ["payment-data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    const reviewData = {
      email: data.email,
      review: data.comment,
      Rating: rating,
      trainerName: currentTrainer,
    };

    console.log(reviewData);

    axiosSecure.post("/testimonials", reviewData).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your review is added to the review page`,
          showConfirmButton: false,
          timer: 1500,
        });
        setOpenModal(false);
      }
    });
  };

  //   console.log(payments);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">
        Trainer Booked Page
      </h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Trainer name</Table.HeadCell>
            <Table.HeadCell>Trainer Email</Table.HeadCell>
            <Table.HeadCell>Class Name</Table.HeadCell>
            <Table.HeadCell>Slot Info</Table.HeadCell>
            <Table.HeadCell>Package </Table.HeadCell>
            <Table.HeadCell> Price</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {payments?.map((item) => (
              <Table.Row
                key={item._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.trainerName}
                </Table.Cell>
                <Table.Cell>{item.trainerEmail}</Table.Cell>
                <Table.Cell>{item.className}</Table.Cell>
                <Table.Cell>{item.selectedSlot}</Table.Cell>
                <Table.Cell>{item.packageName}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.date}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      setCurrentTrainer(item.trainerName);
                      setOpenModal(true);
                    }}
                  >
                    Review
                  </Button>{" "}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Review</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex max-w-md flex-col gap-4"
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  defaultValue={user?.email}
                  id="email1"
                  type="email"
                  readOnly
                  {...register("email", { required: true })}
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="comment" value="Your message" />
                </div>
                <Textarea
                  {...register("comment", { required: true })}
                  id="comment"
                  placeholder="Leave a comment..."
                  required
                  rows={4}
                />
              </div>
              {/* rating */}
              <div className="mb-2 block">
                <Label value="Rating" />
              </div>
              <div className="flex">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={`${
                        index <= (hover || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } bg-transparent border-none cursor-pointer`}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <FaStar className="text-2xl" />
                    </button>
                  );
                })}
              </div>
              {/* Add rating to react-hook-form registration */}
              <input
                type="hidden"
                {...register("rating", { value: rating, required: true })}
              />

              <Button type="submit">Submit</Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default TrainerBooked;
