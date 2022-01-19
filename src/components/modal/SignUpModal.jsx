import React, { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import eyeClose from "../icons/eye-close.svg";
import eye from "../icons/eye.svg";

const SignUpModal = () => {
  const { modalState, toggleModals, signUpContext } = useContext(UserContext);
  const [validationMp, setValidationMp] = useState("");
  const [validationEmail, setValidationEmail] = useState("");

  const [mp, setMp] = useState(false);
  const [mp2, setMp2] = useState(false);

  const togglePassword = () => {
    setMp(mp ? false : true);
  };

  const togglePasswordRepeat = () => {
    setMp2(mp2 ? false : true);
  };

  const inputs = useRef([]);
  const currentRef = inputs.current;

  // si il existe et qu'il est pas déjà dans le tableau inputs => je le rajoute & push
  const addInputs = (el) => {
    if (el && !currentRef.includes(el)) {
      currentRef.push(el);
    }
  };

  const formRef = useRef();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    if ((currentRef[1].value.length || currentRef[2].value.length) < 6) {
      setValidationMp("6 charactères minimum !");
      return;
    } else if (currentRef[1].value !== currentRef[2].value) {
      setValidationMp("Mot de Passe incorrect !");
      return;
    }
    try {
      const createUSer = await signUpContext(
        currentRef[0].value,
        currentRef[1].value
      );
      console.log(createUSer);

      formRef.current.reset();
      toggleModals("close");
      // quand user s'inscrit redirection vers la route privée
      navigate("/private/profil");
    } catch (error) {
      // voir les érreurs venant de Firebase dans la console au submit
      // console.dir(error);}
      if (error.code === "auth/invalid-email") {
        setValidationEmail("Email format invalide !");
      }

      if (error.code === "auth/email-already-in-use") {
        setValidationEmail("Email déjà utilisé ou enregistré !");
      }
    }
  };

  // efface les méssages d'érreurs et ferme le modale avec toggleModals
  const closeModal = () => {
    setValidationMp("");
    setValidationEmail("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            className="w-100 h-100 bg-dark bg-opacity-75"
            onClick={() => closeModal()}
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Inscription</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => closeModal()}
                  ></button>
                </div>
                <div className="modal-body">
                  <form
                    className="sign-up-form"
                    onSubmit={handleForm}
                    ref={formRef}
                  >
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        adresse Email
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        name="email"
                        id="signUpEmail"
                        className="form-control"
                        required
                      />
                      <p className="text-danger mt-1">{validationEmail}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Créer un Mot de Passe
                      </label>
                      <input
                        ref={addInputs}
                        type={mp ? "text" : "password"}
                        name="pwd"
                        id="signUpPwd"
                        className="form-control"
                        required
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
                      <p className="text-danger mt-1">{validationMp}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="repeatPwd" className="form-label">
                        Répétez votre Mot de Passe
                      </label>
                      <input
                        ref={addInputs}
                        type={mp2 ? "text" : "password"}
                        name="pwd"
                        id="repeatPwd"
                        className="form-control"
                        required
                      />
                      <img
                        onClick={togglePasswordRepeat}
                        src={mp2 ? eye : eyeClose}
                        alt={
                          mp2
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
                    </div>
                    <p className="text-danger mt-1">{validationMp}</p>

                    <button className="btn btn-primary">Validez</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
