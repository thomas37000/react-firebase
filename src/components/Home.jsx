import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Upload from "./Upload";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="container p-5">
      <h1 className="display-3 text-light">Insta Like</h1>
      <Upload />
    </div>
  );
};

export default Home;
