import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Auth } from "../firebase/config";

export const UserContext = createContext();

export function UserContextProvider(props) {
  
  const signUpContext = (email, pwd) =>
    createUserWithEmailAndPassword(Auth, email, pwd);

  const signInContext = (email, pwd) =>
    signInWithEmailAndPassword(Auth, email, pwd);

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  // fonction pour se désabonner ou si connecté ou pas avec LoadingData qui devient false
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setCurrentUser(currentUser);
      setLoadingData(false);
    });

    return unsubscribe;
  });

  // modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true,
      });
    }
    if (modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false,
      });
    }
    if (modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{ modalState, toggleModals, signUpContext, currentUser, signInContext }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
