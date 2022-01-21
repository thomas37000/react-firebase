import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase/config";
import firebase from "../components/icons/firebase.png";

const Navbar = () => {
  const { toggleModals } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(Auth);
      navigate("/");
    } catch {
      alert("vider votre cache internet.");
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">
          <img src={firebase} alt="acceuil" className="logo-acceuil" />
        </Link>
        <div>
          <Link
            to="/inscription"
            className="btn btn-primary"
            onClick={() => toggleModals("signUp")}
          >
            Inscription
          </Link>
          <Link
            to="/connexion"
            className="btn btn-primary ms-2"
            onClick={() => toggleModals("signIn")}
          >
            Connexion
          </Link>

          <Link to="/private/profil" className="btn btn-light ms-2">
            profil
          </Link>

          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={logout}
          >
            Déconnexion
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
