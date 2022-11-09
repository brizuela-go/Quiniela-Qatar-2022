import React, { useEffect } from "react";
import QuinielaLlenar from "../../components/QuinielaLlenar";
import { useRouter } from "next/router";
import firebase from "../../firebase/firebaseClient";
import { getUserQuiniela } from "../../firebase/utils";
import { useAuthState } from "react-firebase-hooks/auth";

export async function getServerSideProps({ query }) {
  const res = await fetch(
    "https://quiniela-qatar-2022.vercel.app/api/faseDeGrupos"
  );
  const data = await res.json();

  const uid = query["user"];

  let userData = (await getUserQuiniela(uid)) || null;

  let locales = [];
  let visitantes = [];

  locales.push(null);
  visitantes.push(null);

  for (let i = 1; i < 49; i++) {
    locales.push(userData[i].local);
  }

  for (let i = 1; i < 49; i++) {
    visitantes.push(userData[i].visitante);
  }

  return {
    props: {
      data,
      locales,
      visitantes,
    },
  };
}

export default function Quiniela({ data, locales, visitantes }) {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const router = useRouter();
  useEffect(() => {
    if (!_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading]);

  return (
    <QuinielaLlenar data={data} locales={locales} visitantes={visitantes} />
  );
}
