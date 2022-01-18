import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import Navbar from "../components/Navbar";
import Home from "../components/Home";

const Routter = () => {
  return (
    <Router>
      <Navbar />
      <SignUpModal />
      <SignInModal />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default Routter;
