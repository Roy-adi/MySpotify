import { SignedOut, useSignIn, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import { useApiCallContext } from "../context/ApiCallProvider";

const LoginPage = ({ onClose, onSwitchToSignUp }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signIn } = useSignIn();
  const { SignUpUser,loginUser } = useApiCallContext();

  const [inputdata, setInputData] = useState({
    email:"", password:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value, // Update state key dynamically
    }));
  };

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await loginUser(inputdata);
        onClose();
      } catch (error) {
        console.error("Error signing up:", error);
      }
    };
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-96 bg-white shadow-lg rounded-lg p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &#x2715;
        </button>

        {/* Login Form */}
        <form onSubmit={handleSubmit}> 
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              value={inputdata.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your Email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              value={inputdata.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter your Password"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              className="text-indigo-600 hover:text-indigo-500"
              onClick={onSwitchToSignUp}
            >
              Sign Up
            </a>
          </p>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">Or With</p>
          <div className="flex justify-center space-x-4">
            <SignedOut>
              <button
                className="bg-white border border-gray-300 rounded-lg p-2 w-32 hover:bg-gray-100"
                onClick={signInWithGoogle}
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="h-5 mx-auto"
                />
              </button>
            </SignedOut>
            <button className="bg-white border border-gray-300 rounded-lg p-2 w-32 hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple"
                className="h-5 mx-auto"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
