import React from "react";
import useTrainer from "../../hooks/useTrainer";
import useAuth from "../../hooks/useAuth";
import { Button, Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const TrainerManageSlot = () => {
  const [trainersData, refetch] = useTrainer();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const trainer = trainersData.find((trainer) => trainer.email === user.email);

  const { data: payments = [] } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const bookingData = payments.filter(
    (item) => item.trainerEmail === trainer.email
  );

  const slotBookings = {};
  bookingData.forEach((payment) => {
    slotBookings[payment.selectedSlot] = {
      userEmail: payment.email,
      category: payment.packageName,
      className: payment.className,
    };
  });

  //   console.log(trainer);
  console.log(user?.email);
  console.log(bookingData);

  const handleDeleteSlot = (slot) => [
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSlots = trainer.availableSlots.filter(
          (item) => item !== slot
        );
        axiosSecure
          .patch(`/trainers/${trainer._id}`, { updatedSlots })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `the slot is a member Now!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    }),
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Manage Slots</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Slot</Table.HeadCell>
            <Table.HeadCell>Booked By User</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Class Name</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {trainer?.availableSlots?.map((slot, index) => {
              const bookingInfo = slotBookings[slot] || {};
              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {slot}
                  </Table.Cell>
                  <Table.Cell>
                    {bookingInfo.userEmail || "Not Booked"}
                  </Table.Cell>
                  <Table.Cell> {bookingInfo.category || "N/A"}</Table.Cell>
                  <Table.Cell>{bookingInfo.className || "N/A"}</Table.Cell>
                  <Table.Cell>
                    <Button
                      onClick={() => handleDeleteSlot(slot)}
                      color="light"
                    >
                      <FaTrash />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default TrainerManageSlot;
