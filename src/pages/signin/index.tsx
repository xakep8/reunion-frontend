import React from "react";
// Just import the file
import SigninForm from "./SigninForm";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  // And use it after the h1 tag
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full px-6 py-8 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Sign in
        </h1>
        <SigninForm />
        <p className="text-center text-white mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="mt-4 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signin;
