import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserConnected from "../components/Private/User/UserConnected";
import { UserContextProvider } from "../context/UserContext";
import SignUpModal from "../components/modal/SignUpModal";
import SignInModal from "../components/modal/SignInModal";
import Private from "../components/Private/Private";
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
          <Route path="/private" element={<Private />}>
            <Route path="/private/home" element={<UserConnected />}></Route>
          </Route>
        </Routes>
      </UserContextProvider>
    </Router>
  );
};

export default Routter;
