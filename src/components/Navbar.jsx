import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { toggleModals } = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">
          Firebase App
        </Link>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toggleModals("signUp")}
          >
            Inscription
          </button>
          <button
            type="button"
            className="btn btn-primary ms-2"
            onClick={() => toggleModals("signIn")}
          >
            Connexion
          </button>
          <button type="button" className="btn btn-danger ms-2">
            Déconnexion
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
