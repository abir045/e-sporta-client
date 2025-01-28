import React, { useContext } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Controller, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { AuthContext } from "../providers/AuthProvider";
import { Button, Checkbox, Label } from "flowbite-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
// import useTrainer from "../hooks/useTrainer";
import useClasses from "../hooks/useClasses";
import { Helmet } from "react-helmet-async";

const image_hoting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hoting_key}`;

const BecomeTrainer = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, control } = useForm();
  const { user } = useContext(AuthContext);
  const [classesData] = useClasses();

  const animatedComponents = makeAnimated();

  console.log(user);

  const onSubmit = async (data) => {
    console.log(data);

    const skills = [
      "bodybuilding",
      "powerlifting",
      "Weightlifting",
      "Zumba",
      "CrossFit",
      "StrengthConditioning",
      "Yoga",
      "Pilates",
      "Cardio",
      "HIIT",
    ]
      .filter((skill) => data[skill])
      .map((skill) => skill);

    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);

    if (res.data.success) {
      const availableSlots = data.availableDays.map(
        (day) => `${day.value} ${data.AvailableTime}`
      );

      const classNames = data.className.map((option) => option.value);
      const trainerData = {
        trainerName: data.name,
        email: data.email,
        availableSlots: availableSlots,
        details: data.details,
        age: parseInt(data.Age),
        qualification: data.qualification,
        yearsOfExperience: parseInt(data.experience),
        socialLink: data.socialLinK,
        expertise: skills, // Array of selected skills
        status: "pending",
        profileImage: res.data.data.display_url,
        className: classNames,
      };

      console.log(trainerData);

      const trainerRes = await axiosSecure.post("/appliedTrainer", trainerData);
      console.log(trainerRes.data);
      if (trainerRes.data.insertedId) {
        //show success op up
        axiosSecure.patch(`/trainers/applied/${user.email}`);
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the applied trainer`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const classOptions = classesData.map((item) => ({
    value: item.className,
    label: item.className,
  }));

  const options = [
    { value: "saturday", label: "saturday" },
    { value: "sunday", label: "sunday" },
    { value: "monday", label: "monday" },
    { value: "tuesday", label: "tuesday" },
    { value: "wednesday", label: "wednesday" },
    { value: "thursday", label: "thursday" },
    { value: "friday", label: "friday" },
  ];

  return (
    <div>
      <Helmet>
        <title>E-Sporta | Become a Trainer</title>
      </Helmet>
      <h2 className="text-center text-3xl font-bold  my-10">
        Become a Trainer
      </h2>
      <div className="max-w-6xl mx-auto px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Full Name*</span>
            </div>
            <input
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
                <span className="label-text">Available days a week</span>
              </div>

              <Controller
                name="availableDays" // This replaces register
                control={control}
                rules={{ required: true }} // Validation rules go here
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    // closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={options}
                  />
                )}
              />
            </label>

            {/* time of the day */}
            <label className="form-control w-full my-6">
              <div className="label">
                <span className="label-text">Available Time in a days</span>
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

          {/* trainer details */}

          <label className="form-control">
            <div className="label">
              <span className="label-text">Details</span>
            </div>
            <textarea
              {...register("details", { required: true })}
              className="textarea textarea-bordered h-24 max-w-md w-full"
              placeholder="trainer details"
            ></textarea>
          </label>

          {/* price */}
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Age</span>
            </div>
            <input
              type="number"
              placeholder="Age"
              {...register("Age", { required: true })}
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
              required
              //   placeholder="Your Name"
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
              placeholder="Experience"
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
              type="text"
              required
              placeholder="Social Link"
              {...register("socialLinK", { required: true })}
              className="input input-bordered w-full "
            />
          </label>

          {/* select a class */}
          <div className="mt-4">
            <label className="form-control w-full mt-5">
              <div className="label">
                <span className="label-text">Select a class</span>
              </div>

              <Controller
                name="className" // This replaces register
                control={control}
                rules={{ required: true }} // Validation rules go here
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    // closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={classOptions}
                  />
                )}
              />
            </label>
          </div>

          {/* skill checkbox */}
          <div className="label mt-4">
            <span className="label-text">Skills</span>
          </div>

          <div className="flex max-w-md flex-col gap-4 mt-6" id="checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="bodybuilding" {...register("bodybuilding")} />
              <Label htmlFor="bodybuilding">Bodybuilding</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="powerlifting" {...register("powerlifting")} />
              <Label htmlFor="powerlifting">Powerlifting</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="Weightlifting" {...register("Weightlifting")} />
              <Label htmlFor="Weightlifting">Weight lifting</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="Zumba" {...register("Zumba")} />
              <Label htmlFor="Zumba">Zumba</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="CrossFit" {...register("CrossFit")} />
              <Label htmlFor="CrossFit">CrossFit</Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="StrengthConditioning"
                {...register("StrengthConditioning")}
              />
              <Label htmlFor="StrengthConditioning">
                Strength & Conditioning
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="Yoga" {...register("Yoga")} />
              <Label htmlFor="Yoga">Yoga</Label>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Checkbox id="Pilates" {...register("Pilates")} />
            <Label htmlFor="Pilates">Pilates</Label>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Checkbox id="Cardio" {...register("Cardio")} />
            <Label htmlFor="Cardio">Cardio</Label>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <Checkbox id="HIIT" {...register("HIIT")} />
            <Label htmlFor="HIIT">HIIT workouts</Label>
          </div>

          {/* img */}

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <Button className="" type="submit">
            Apply{" "}
          </Button>
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
};

export default BecomeTrainer;
