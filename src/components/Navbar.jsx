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
import { FiBell } from "react-icons/fi";
import { CSSTransition } from "react-transition-group";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const Navbar = () => {

  const [notificationModal, setNotificationModal] = useState(false);


  const toggleModal = () => {
    setNotificationModal((prev) => !prev);
  };

  const transitionStyles = {
    entering: { opacity: 1, transform: "translateY(0)" },
    entered: { opacity: 1, transform: "translateY(0)" },
    exiting: { opacity: 0, transform: "translateY(-10px)" },
    exited: { opacity: 0, transform: "translateY(-10px)" },
  };
  const naviagte = useNavigate();
  const [accessToken, setAccessToken] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { signIn } = useSignIn();

  const { userDetailsCall, userData,getCollaborationList,collaborationList,CollaborationReq } = useApiCallContext();

  useEffect(() => {
    if (accessToken) {
      userDetailsCall();
    }
  }, [accessToken]);

useEffect(()=>{
  getCollaborationList()
},[])



const handleResponse = (notificationId, response) => {
  
  const dataToSend ={
    requestId: notificationId,
    response: response,
  }
  CollaborationReq(dataToSend);
};

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
        
        <button
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        onClick={toggleModal}
      >
        <FiBell className="h-6 w-6 text-gray-600" />
      </button>

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

       <CSSTransition
        in={notificationModal}
        timeout={300}
        unmountOnExit
      >
        {(state) => (
          <div
            style={{
              ...transitionStyles[state],
              transition: "opacity 300ms, transform 300ms",
              position: "absolute",
              top: "4rem",
              right: "7rem",
              width: "18rem",
              backgroundColor: "white",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "0.5rem",
              padding: "1rem",
              zIndex: "999999"
            }}
          >
             <h3 className="text-lg font-semibold mb-4 text-black">
              Collaboration Requests
            </h3>
            <ul>
              {collaborationList?.requestsList?.map((notification, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-md"
                >
                  <img
                    src={notification.playlist_image}
                    alt="Playlist"
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {notification.playlist_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Owner: {notification.owner_name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {notification.status === "accepted" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : notification.status === "rejected" ? (
                      <FaTimesCircle className="text-red-500" />
                    ) : (
                      <>
                        <button className="text-green-500 hover:text-green-600" onClick={() =>
                            handleResponse(notification._id, "accepted")
                          }>
                           <FaCheckCircle className="text-green-500" />
                        </button>
                        <button className="text-red-500 hover:text-red-600"  onClick={() =>
                            handleResponse(notification._id, "rejected")
                          }>
                         <FaTimesCircle className="text-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CSSTransition>
    </>
  );
};

export default Navbar;
