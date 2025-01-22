import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import useTrainer from "../../hooks/useTrainer";
import { useForm, Controller, reset } from "react-hook-form";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hoting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hoting_key}`;

const AddNewClass = () => {
  const [trainersData] = useTrainer();
  const { register, handleSubmit, reset, control } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const options = trainersData.map((trainer) => {
    const skills = trainer.expertise.join(", ");

    return {
      value: `${trainer.trainerName}`,
      label: `${trainer.trainerName} - ${skills}`,
    };
  });

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    console.log(res.data);

    if (res.data.success) {
      const trainerNames = data.trainerName.map((day) => `${day.value}`);

      const classData = {
        className: data.class,
        category: data.category,
        details: data.details,
        duration: data.duration,
        trainerName: trainerNames,
        image: res.data.data.display_url,
      };

      //   console.log(classData);
      const ClassRes = await axiosSecure.post("/classes", classData);
      console.log(ClassRes.data);
      if (ClassRes.data.insertedId) {
        //show success op up
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your class is added to the Class`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  console.log(options);

  return (
    <div>
      <h2 className="text2xl font-bold text-center my-10">Add a new Class</h2>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="className" value="Class Name" />
            </div>
            <TextInput
              name="class"
              id="class"
              type="text"
              placeholder="class Name"
              {...register("class", { required: true })}
              required
            />
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="comment" value="details" />
            </div>
            <Textarea
              name="details"
              id="details"
              placeholder="Details..."
              required
              rows={4}
              {...register("details", { required: true })}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="category" value="category" />
            </div>
            <TextInput
              name="category"
              id="category"
              type="text"
              placeholder="category"
              required
              {...register("category", { required: true })}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="duration" value="duration" />
            </div>
            <TextInput
              name="duration"
              id="duration"
              type="text"
              placeholder="duration"
              required
              {...register("duration", { required: true })}
            />
          </div>

          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Add Trainers</span>
            </div>

            <Controller
              name="trainerName" // This replaces register
              control={control}
              rules={{ required: true }} // Validation rules go here
              render={({ field }) => (
                <Select
                  {...field}
                  isMulti
                  // closeMenuOnSelect={false}

                  options={options}
                />
              )}
            />
          </label>

          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewClass;
