import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "../context/UserContext";
import SignUpModal from "../components/modal/SignUpModal";
import SignInModal from "../components/modal/SignInModal";
import Navbar from "../components/Navbar";
import Home from "../components/Home";

const Routter = () => {
  return (
    <Router>
      <UserContextProvider>
        <Navbar />
        <SignUpModal />
        <SignInModal />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
};

export default Routter;
