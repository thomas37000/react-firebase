import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Auth } from "../firebase/config";

const Navbar = () => {
  const { toggleModals } = useContext(UserContext);
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await signOut(Auth)
      navigate("/")
    } catch {
      alert("vider votre cache internet.")
    }
  }

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
          <button type="button" className="btn btn-danger ms-2" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
