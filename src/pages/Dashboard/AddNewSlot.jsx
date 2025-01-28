import React from "react";
import useTrainer from "../../hooks/useTrainer";
import useAuth from "../../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Button, Checkbox, Label } from "flowbite-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AddNewSlot = () => {
  const [trainersData, refetch] = useTrainer();
  const { user } = useAuth();
  const { register, handleSubmit, reset, control } = useForm();
  const trainer = trainersData.find((trainer) => trainer.email === user?.email);
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    console.log(data);
    const newSlots = data.availableDays.map(
      (day) => `${day.value} ${data.AvailableTime}`
    );
    console.log(newSlots);

    const updatedSlots = [...(trainer?.availableSlots ?? []), ...newSlots];

    console.log(updatedSlots);

    axiosSecure
      .patch(`/trainers/${trainer._id}`, { updatedSlots })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `the slot is a added Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const skillOptions = trainer?.expertise?.map((skill) => ({
    value: skill,
    label: skill,
  }));

  const options = trainer?.availableSlots?.map((slot) => ({
    value: slot,
    label: slot,
  }));

  const dayOptions = [
    { value: "saturday", label: "saturday" },
    { value: "sunday", label: "sunday" },
    { value: "monday", label: "monday" },
    { value: "tuesday", label: "tuesday" },
    { value: "wednesday", label: "wednesday" },
    { value: "thursday", label: "thursday" },
  ];

  return (
    <div>
      <Helmet>
        <title>E-Sporta | Add a New Slot </title>
      </Helmet>
      <h2 className="text-2xl text-center font-bold my-8">Add New Slot</h2>

      <div className="max-w-6xl mx-auto px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Full Name*</span>
            </div>
            <input
              defaultValue={trainer?.trainerName}
              readOnly
              type="text"
              required
              placeholder="Your Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full "
            />
          </label>

          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              defaultValue={user?.email}
              type="text"
              readOnly
              required
              //   placeholder="Your Name"
              {...register("email", { required: true })}
              className="input input-bordered w-full "
            />
          </label>

          <div className="flex gap-6">
            {/* available days */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Available Slots</span>
              </div>

              <Controller
                name="selectedSlots" // This replaces register
                defaultValue={options}
                control={control}
                rules={{ required: true }} // Validation rules go here
                render={({ field }) => (
                  <Select {...field} isMulti isDisabled={true} />
                )}
              />
            </label>
          </div>

          {/* trainer details */}

          <label className="form-control">
            <div className="label">
              <span className="label-text">Details</span>
            </div>
            <textarea
              defaultValue={trainer?.details}
              {...register("details", { required: true })}
              className="textarea textarea-bordered h-24 max-w-md w-full"
              placeholder="trainer details"
              readOnly
            ></textarea>
          </label>

          {/* price */}
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              defaultValue={trainer?.age || "NA"}
              readOnly
              type="number"
              placeholder="Age"
              className="input input-bordered w-full "
            />
          </label>

          {/* qualification */}
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Qualification</span>
            </div>
            <input
              type="text"
              readOnly
              required
              defaultValue={trainer?.qualification}
              {...register("qualification", { required: true })}
              className="input input-bordered w-full "
            />
          </label>

          {/* years of experience */}
          <label className="form-control w-full my-6">
            <div className="label mt-2">
              <span className="label-text">Years Of Experience</span>
            </div>
            <input
              type="number"
              readOnly
              placeholder="Experience"
              defaultValue={trainer?.yearsOfExperience}
              {...register("experience", { required: true })}
              className="input input-bordered w-full "
            />
          </label>

          {/* social link */}
          <label className="form-control w-full my-6 ">
            <div className="label mt-2">
              <span className="label-text">Social Link</span>
            </div>
            <input
              defaultValue={trainer?.socialLink}
              type="text"
              readOnly
              required
              placeholder="Social Link"
              {...register("socialLinK", { required: true })}
              className="input input-bordered w-full "
            />
          </label>

          {/* skill checkbox */}
          <div className="label mt-4">
            <span className="label-text">Skills</span>
          </div>

          {/* expertise */}
          <div className="form-control flex gap-2">
            {skillOptions?.map((skill) => (
              <label key={skill.value} className="label cursor-pointer">
                <span className="label-text">{skill.label}</span>
                <input
                  type="checkbox"
                  checked={true}
                  readOnly
                  className="checkbox checkbox-primary ml-2"
                />
              </label>
            ))}
          </div>

          {/* img */}

          <div className="form-control w-full my-6">
            <img
              className="w-20 h-20 rounded-full"
              src={trainer?.profileImage}
              alt=""
            />
          </div>

          <div className="flex gap-6">
            {/* available days */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Available days a week</span>
              </div>

              <Controller
                name="availableDays" // This replaces register
                control={control}
                rules={{ required: true }} // Validation rules go here
                render={({ field }) => (
                  <Select {...field} isMulti options={dayOptions} />
                )}
              />
            </label>

            {/* time of the day */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Available Time in a day</span>
              </div>
              <input
                type="text"
                required
                placeholder="Available Time"
                {...register("AvailableTime", { required: true })}
                className="input input-bordered w-full "
              />
            </label>
          </div>

          <Button className="" type="submit">
            Add Slot{" "}
          </Button>
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
};

export default AddNewSlot;
