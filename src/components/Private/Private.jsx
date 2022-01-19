import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Outlet, useLocation, Navigate } from "react-router-dom";

const Private = () => {
  const { currentUser } = useContext(UserContext);
  console.log("route privée", currentUser);

  // si l'utilisateur n'est pas connecté redirection vers l'acceuil
  // avec Navigate composant React Router
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {/* { Outlet composant React Router qui permet de voir les routes imbriquées dans react router} */}
      <Outlet />
    </div>
  );
};

export default Private;
