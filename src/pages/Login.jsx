import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";
import { Button, Card } from "flowbite-react";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User login successfully",
        showClass: {
          popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
        },
        hideClass: {
          popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
        },
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="">
      <h2 className="text-center text-3xl">Login Now!</h2>
      <div className="flex flex-col items-center mt-10 ">
        <Card className="w-full max-w-3xl mx-auto">
          <form onSubmit={handleLogin} className="">
            <div className="form-control flex flex-col mb-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control flex flex-col mb-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <Button type="submit" className="">
                Login
              </Button>
              {/* <input className="btn btn-primary" type="submit" value="Login" /> */}
            </div>
          </form>
          <p className="p-2">
            <small>
              New Here?{" "}
              <Link className="text-red-500" to={"/register"}>
                {" "}
                Create an account
              </Link>
            </small>
          </p>

          <SocialLogin />
        </Card>
      </div>
    </div>
  );
};

export default Login;
