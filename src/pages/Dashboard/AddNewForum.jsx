import { Button, Label, Textarea, TextInput } from "flowbite-react";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddNewForum = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, control } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    console.log(data);

    const newPost = {
      email: data.email,
      title: data.title,
      desc: data.description,
    };

    axiosSecure.post("/forum", newPost).then((res) => {
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Your post is added to the forum page`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    console.log(newPost);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center my-10">Add a new Post</h2>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-md flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              defaultValue={user.email}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="Add a Title" value="Add a Title" />
            </div>
            <TextInput
              id="title"
              type="text"
              placeholder="Add a title"
              {...register("title", { required: true })}
              required
            />
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="description" value="description" />
            </div>
            <Textarea
              id="description"
              placeholder="Description..."
              required
              rows={4}
              {...register("description", { required: true })}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddNewForum;
