import React from "react";
import useAuth from "../../hooks/useAuth";
import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { register, handleSubmit, reset, control } = useForm();
  const navigate = useNavigate();
  console.log(user);

  const onSubmit = (data) => {
    console.log(data);
    updateUserProfile(data.name, data.photoURL);
    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      text: "Your profile has been successfully updated.",
      confirmButtonText: "OK",
    });
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-10 text-center">Profile Page</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            defaultValue={user?.displayName}
            id="name"
            type="text"
            placeholder="your name"
            {...register("name", { required: true })}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            defaultValue={user?.email}
            id="email1"
            type="email"
            placeholder="your email"
            required
            readOnly
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="photoURL" value="Your photo URL" />
          </div>
          <TextInput
            defaultValue={user?.photoURL}
            {...register("photoURL", { required: true })}
            id="photo"
            type="text"
            placeholder="your photo url"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="profile photo" value="Your profile photo" />
          </div>
          <img src={user?.photoURL} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastLogin" value="Last Login" />
          </div>
          <TextInput
            defaultValue={user?.metadata.lastSignInTime}
            id="lastLogin"
            type="text"
            placeholder="Last login"
            required
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProfilePage;
