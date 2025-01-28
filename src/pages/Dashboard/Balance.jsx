import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Badge, Table } from "flowbite-react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import { Helmet } from "react-helmet-async";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payment-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const chartData = [
    { name: "Subscribers", value: stats?.subscribers },
    { name: "Paid Members", value: stats?.totalPaidMembers },
  ];

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
      <Helmet>
        <title>E-Sporta | Balance</title>
      </Helmet>
      <h2 className="text-2xl text-center font-bold my-10">Balance</h2>

      <Badge color="gray" className="max-w-sm p-4 text-xl">
        Total Balance: {stats.revenue}$
      </Badge>

      {/* <h2>Total Balance: {stats.revenue}$</h2> */}

      {/* Additionally, the last six booking payment transactions are listed,
       providing a recent history of financial activities.  */}

      <div>
        <h2 className="text-center font-bold text-2xl ">
          Last six Booking Payments
        </h2>

        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Package Name</Table.HeadCell>
              <Table.HeadCell>Package ID</Table.HeadCell>
              <Table.HeadCell>Class Name</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>selected Slot</Table.HeadCell>
              <Table.HeadCell>Customer Email</Table.HeadCell>
              <Table.HeadCell>Trainer Email</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {payments.slice(-6).map((item) => (
                <Table.Row
                  key={item._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{item.packageName}</Table.Cell>
                  <Table.Cell>{item.packageId}</Table.Cell>
                  <Table.Cell>{item.className}</Table.Cell>
                  <Table.Cell>{item.price}$</Table.Cell>
                  <Table.Cell>{item.selectedSlot}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.trainerEmail}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex my-10">
          {/* bar chart */}
          <div className="w-1/2">
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="value"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {/* {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                ))} */}
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
