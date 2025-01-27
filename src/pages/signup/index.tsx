import React from "react";
// Import the file
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  // And use it after the h2 tag
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="max-w-md w-full px-6 py-8 bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Sign up
        </h1>
        <SignupForm />
        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
