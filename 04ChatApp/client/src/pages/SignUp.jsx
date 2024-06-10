import React from "react";
import GenderCheckBox from "../components/GenderCheckBox";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-cyan-500 ">GupShupHub</span>
        </h1>

        <form action="" className="flex flex-col gap-3 mt-5">
          <div className="">
            <label className="label p-2">
              <span className="text-base label-text"> Fullname </span>
            </label>
            <input
              type="text"
              placeholder="Enter fullname"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="">
            <label className="label p-2">
              <span className="text-base label-text"> Username </span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="">
            <label className="label">
              <span className="text-base label-text"> Password </span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10"
            />
          </div>

          <div className="">
            <label className="label">
              <span className="text-base label-text"> Confirm Password </span>
            </label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <GenderCheckBox />
          <Link
            to={"/login"}
            className="text-sm hover:underline hover:text-cyan-600 inline-block"
          >
            Have An Account ?
          </Link>

          <div className="">
            <button className="btn btn-block btn-sm p-2 mt-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
