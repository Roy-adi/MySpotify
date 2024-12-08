/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useSignIn,
  useUser,
} from "@clerk/clerk-react";
// eslint-disable-next-line no-unused-vars
import { useApiCallContext } from "../context/ApiCallProvider";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const naviagte = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { signIn } = useSignIn();

  const { userDetailsCall, userData } = useApiCallContext();

  useEffect(() => {
    if (accessToken) {
      userDetailsCall();
    }
  }, [accessToken]);




  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, [accessToken]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    setAccessToken(null); // Update state
  };

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsSignUpOpen(false);
  };

  const openSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(false);
  };

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
            onClick={() => naviagte(-1)}
          />
          <img
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
            onClick={() => naviagte(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
        {userData.admin && (
          <Link to='/dashboard' className="bg-green-600 text-white text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Admin
          </Link>
        )}
          <p>
            {accessToken ? (
              <button
                className="bg-red-500 text-white text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer"
                onClick={openLogin}
              >
                SignUp
              </button>
            )}
          </p>

          
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "rounded-full border border-white",
                    triggerButton:
                      "bg-gray-800 text-white hover:bg-gray-700 px-3 py-2 rounded-lg shadow-md",
                  },
                }}
              />
              <span className="text-white text-sm font-medium">
                Hii {user?.firstName} 😊
              </span>
            </SignedIn>
        
          {userData && accessToken && (
            <div className="text-white rounded-full flex items-center justify-center cursor-pointer">
              {/* Profile Image */}
              <img
                src={userData?.user?.imageUrl}
                alt={userData.user?.name}
                className="w-8 h-8 rounded-full mr-2" 
              />
            
              <span>Hii {userData.user?.name} 😊</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl">All</p>
        <p className="bg-[#242424] cursor-pointer  px-4 py-1 rounded-2xl">
          Music
        </p>
        <p className="bg-[#242424] cursor-pointer  px-4 py-1 rounded-2xl">
          Podcasts
        </p>
      </div>

      {isLoginOpen && (
        <LoginPage onClose={closeModals} onSwitchToSignUp={openSignUp} />
      )}

      {isSignUpOpen && (
        <SignUpModal onClose={closeModals} onSwitchToLogin={openLogin} />
      )}
    </>
  );
};

export default Navbar;
