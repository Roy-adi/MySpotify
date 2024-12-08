import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { ApiCallProvider } from "./context/ApiCallProvider.jsx";
import { PlayerProvider } from "./context/PlayerProvider.jsx";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     
      <PlayerProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <ApiCallProvider>
            <App />
          </ApiCallProvider>
        </ClerkProvider>
        </PlayerProvider>
 
      
    </BrowserRouter>
  </React.StrictMode>
);
