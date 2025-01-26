import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Modal } from "flowbite-react";
import { FaEye } from "react-icons/fa";

const ActivityLog = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);

  const { data: userDetails = {}, refetch } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const { data: rejectedFeedBack = {} } = useQuery({
    queryKey: ["rejected-data"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rejected/${user?.email}`);
      return res.data;
    },
  });

  const handleShowDetails = () => {
    setOpenModal(true);
  };

  console.log(userDetails);

  return (
    <div>
      <h2 className="text-2xl font-bol text-center my-10">Activity Log</h2>

      <div>
        <Badge color="gray" className="font-semibold p-4 text-xl">
          Status: {userDetails.status}
        </Badge>

        <Button className="mt-10" onClick={handleShowDetails}>
          <FaEye />
        </Button>

        {/* {userDetails.status === "rejected" ? (
          <p>Feedback: {rejectedFeedBack.feedback}</p>
        ) : (
          ""
        )} */}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Rejection Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-base font-bold leading-relaxed text-gray-500 dark:text-gray-400">
                Feedback: {userDetails.feedback}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={() => setOpenModal(false)}>I accept</Button> */}
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ActivityLog;
