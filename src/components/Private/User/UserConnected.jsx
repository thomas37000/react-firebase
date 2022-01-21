import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const UserConnected = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div className="container p-5 d-flex justify-content-center">
      <div className="card" style={{ width: "25rem" }}>
      <img src="..." alt="" className="profil" />
        <div className="card-body">
          <h5 className="card-title"> Bienvenue {currentUser.email}! </h5>
          <p className="card-text"></p>
        </div>
        {/* <div className="card-body">
          <Link to="/modifier" className="btn btn-primary">
            Modifier
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default UserConnected;
