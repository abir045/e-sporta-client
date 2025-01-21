import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

const AppliedTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: appliedTrainers = [], refetch } = useQuery({
    queryKey: ["applied-trainers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appliedTrainer");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Applied Trainers</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Profile Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {appliedTrainers.map((item) => (
              <Table.Row
                key={item._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img
                    src={item.profileImage}
                    className="w-20 h-20 rounded-full object-cover"
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{item.trainerName}</Table.Cell>
                <Table.Cell>{item.email}</Table.Cell>
                <Table.Cell>
                  <Link to={`/dashboard/appliedTrainers/${item._id}`}>
                    <Button>Details</Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AppliedTrainer;
