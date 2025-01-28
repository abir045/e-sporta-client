import { Table } from "flowbite-react";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscribers = [] } = useQuery({
    queryKey: ["subscribers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newsletterSubscribers");
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>E-Sporta | Newsletter Subscribers</title>
      </Helmet>
      <h2 className="text-2xl font-bold text-center my-10">All Subscribers</h2>

      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {subscribers?.map((item) => (
              <Table.Row
                key={item._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item.Name}
                </Table.Cell>

                <Table.Cell>{item.Email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default Subscribers;
