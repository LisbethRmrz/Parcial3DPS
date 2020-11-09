import React from "react";

import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <UserProvider>
      <Application />
      <div className="footer">
      <ToastContainer />
      </div>
    </UserProvider>

  );
}

export default App;