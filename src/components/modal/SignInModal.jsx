import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";
// useNavigate remplace useHistory dans React router V6
import {Link, useNavigate } from "react-router-dom";
import eyeClose from "../icons/eye-close.svg";
import eye from "../icons/eye.svg";

const SignInModal = () => {
  const { modalState, toggleModals, signInContext } = useContext(UserContext);
  const [validation, setValidation] = useState("");

  const [mp, setMp] = useState(false);
  const togglePassword = () => {
    setMp(mp ? false : true);
  };

  const navigate = useNavigate();

  const inputs = useRef([]);
  const currentRef = inputs.current;

  const addInputs = (el) => {
    if (el && !currentRef.includes(el)) {
      currentRef.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const connexion = await signInContext(
        currentRef[0].value,
        currentRef[1].value
      );

      setValidation("");
      toggleModals("close");
      navigate("/private/profil");
    } catch {
      setValidation("Email ou Mot de passe incorrect");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
    navigate("/");
  };

  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Connexion</h5>
                  <button onClick={closeModal} className="btn-close"></button>
                </div>

                <div className="modal-body">
                  <form
                    ref={formRef}
                    onSubmit={handleForm}
                    className="sign-up-form"
                  >
                    <div className="mb-3">
                      <label htmlFor="signInEmail" className="form-label">
                        adresse Email
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        // id="signInEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Mot de Passe
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type={mp ? "text" : "password"}
                        className="form-control"
                        // id="signInPwd"
                      />
                      <img
                        onClick={togglePassword}
                        src={mp ? eye : eyeClose}
                        alt={
                          mp
                            ? "affiche le mot de passe"
                            : "cache le mot de passe"
                        }
                        className="eyes"
                        style={{
                          position: "relative",
                          float: "right",
                          margin: "-30px",
                          marginRight: "10px",
                          width: "20px",
                          opacity: "0.6",
                        }}
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                  <div>
                    <Link to="/modifier" className="d-flex justify-content-end">
                      Mot de passe oublié
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
