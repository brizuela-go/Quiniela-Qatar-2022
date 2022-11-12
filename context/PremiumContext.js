import React, { createContext, useContext } from "react";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";

const Context = createContext();

export const PremiumContext = ({ children }) => {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(_user);

  return (
    <Context.Provider
      value={{
        userIsPremium,
        _user,
        userLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
