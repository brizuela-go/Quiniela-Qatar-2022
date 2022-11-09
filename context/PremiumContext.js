import React, { createContext, useContext } from "react";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";

const Context = createContext();

export const PremiumContext = ({ children }) => {
  const [user] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(user);

  return (
    <Context.Provider
      value={{
        userIsPremium,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
