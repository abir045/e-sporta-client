import React from "react";
import useTrainer from "../../hooks/useTrainer";
import { Button, Table } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Trainers = () => {
  const [trainersData, refetch] = useTrainer();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleRemoveTrainer = (trainer) => {
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
        axiosSecure.delete(`/trainers/${trainer._id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            axiosSecure.patch(`/trainers/delete/${user?.email}`);

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${trainer.trainerName} is a member Now!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">All Trainers</h2>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Profile Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>

            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>

            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {trainersData.map((trainer) => (
              <Table.Row
                key={trainer._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img
                    src={trainer.profileImage}
                    className="w-20 h-20 rounded-full object-cover"
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{trainer.trainerName}</Table.Cell>
                <Table.Cell>{trainer.email}</Table.Cell>
                <Table.Cell>{trainer.role}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => handleRemoveTrainer(trainer)}
                    color="light"
                  >
                    <FaTrash className="text-red-600" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Trainers;
