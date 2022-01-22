import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Upload from "../../Upload";

const UserConnected = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container p-5 d-flex justify-content-center">
      <div className="card" style={{ width: "25rem" }}>
        <Upload />
        <div className="card-body">
          <h5 className="card-title"> Bienvenue {currentUser.email}! </h5>
          <p className="card-text"></p>
        </div>
      </div>
    </div>
  );
};

export default UserConnected;
