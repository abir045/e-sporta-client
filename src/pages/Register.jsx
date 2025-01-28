import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Button, Card } from "flowbite-react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            role: "member",
          };

          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div>
      <Helmet>
        <title>E-Sporta | Register</title>
      </Helmet>
      <h2 className="text-3xl text-center mt-20">Register Now</h2>

      <div className="mt-10">
        <Card className="max-w-5xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div className="form-control flex flex-col mt-2">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="photo URL"
                name="photoURL"
                className="input input-bordered"
                required
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div className="form-control flex flex-col mt-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control flex flex-col mt-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
                })}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Password must be 6 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  Password must have one uppercase, one number and one lowercase
                  letter
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  Password must be less than 20 characters
                </span>
              )}
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              {/* <input
                type="submit"
                value="Register"
                className="btn btn-primary"
              /> */}
              <Button type="submit" className="">
                Register
              </Button>
            </div>
          </form>
          <p className="p-2">
            <small>
              Already have an account?{" "}
              <Link className="text-red-500" to={"/login"}>
                {" "}
                Login
              </Link>
            </small>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
