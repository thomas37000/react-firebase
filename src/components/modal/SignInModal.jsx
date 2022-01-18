import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const SignInModal = () => {
  const { modalState, toggleModals } = useContext(UserContext);

  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            className="w-100 h-100 bg-dark bg-opacity-75"
            // onClick={}
          >
            {" "}
          </div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Connexion</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => toggleModals("close")}
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="sign-up-form">
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        adresse Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="signUpEmail"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Mot de Passe
                      </label>
                      <input
                        type="password"
                        name="pwd"
                        id="signInPwd"
                        className="form-control"
                        required
                      />{" "}
                    </div>
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

export default SignInModal;
