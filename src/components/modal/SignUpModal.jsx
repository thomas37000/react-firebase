import React, { useState, useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";

const SignUpModal = () => {
  const { modalState, toggleModals, signUpContext } = useContext(UserContext);
  const [validationMp, setValidationMp] = useState("");
  const [validationEmail, setValidationEmail] = useState("");

  const inputs = useRef([]);
  const currentRef = inputs.current;

  // si il existe et qu'il est pas déjà dans le tableau inputs => je le rajoute & push
  const addInputs = (el) => {
    if (el && !currentRef.includes(el)) {
      currentRef.push(el);
    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    if ((currentRef[1].value.length || currentRef[2].value.length) < 6) {
      setValidationMp("6 charactères minimum");
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
      // vider les messages d'érreur au submit
      formRef.current.reset();
    } catch (error) {}
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
                        type="password"
                        name="pwd"
                        id="signUpPwd"
                        className="form-control"
                        required
                      />{" "}
                      <p className="text-danger mt-1">{validationMp}</p>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="repeatPwd" className="form-label">
                        Répétez votre Mot de Passe
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        id="repeatPwd"
                        className="form-control"
                        required
                      />{" "}
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
