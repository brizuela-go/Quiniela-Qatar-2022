import React from "react";
import Register from "../components/Register";
import { useEffect } from "react";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type Props = {};

const register = (props: Props) => {
  const [user, userLoading] = useAuthState(firebase.auth());

  const router = useRouter();

  useEffect(() => {
    if (user && !userLoading) {
      router.push("/");
    }
  }, [user, userLoading]);
  return <Register />;
};

export default register;
