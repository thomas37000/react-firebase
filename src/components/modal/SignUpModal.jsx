import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";

const SignUpModal = () => {
  const { modalState, toggleModals } = useContext(UserContext);
  const [validation, setValidation] = useState("");

  // si il existe et qu'il est pas déjà dans le tableau inputs => je le rajoute & push
  const inputs = useRef([]);
  const currentRef = inputs.current;

  const addInputs = (el) => {
    if (el && !currentRef.includes(el)) {
      currentRef.push(el);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if ((currentRef[1].value.length || currentRef[2].value.length) < 6) {
      setValidation("6 charactères min");
      return;
    } else if (currentRef[1].value !== currentRef[2].value) {
      setValidation("Passwords incorrect !");
      return;
    }
  };

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            className="w-100 h-100 bg-dark bg-opacity-75"
            onClick={() => toggleModals("close")}
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
                    onClick={() => toggleModals("close")}
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="sign-up-form" onSubmit={handleForm}>
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
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Créer un Mot de Passe
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        id="signUpPwd"
                        className="form-control"
                        required
                      />{" "}
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Répétez votre Mot de Passe
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        id="signUpPwd"
                        className="form-control"
                        required
                      />{" "}
                    </div>
                    <p className="text-danger mt-1">{validation}</p>

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
