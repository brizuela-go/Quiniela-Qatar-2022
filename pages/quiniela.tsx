import React, { useEffect } from "react";
import QuinielaLlenar from "../components/QuinielaLlenar";
import { useRouter } from "next/router";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";

export async function getServerSideProps() {
  const res = await fetch(
    "https://quiniela-qatar-2022.vercel.app/api/faseDeGrupos"
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Quiniela({ data }) {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const router = useRouter();
  useEffect(() => {
    if (!_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading]);

  return <QuinielaLlenar data={data} />;
}
