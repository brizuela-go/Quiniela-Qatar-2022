import React, { useEffect } from "react";
import Marcadores from "../components/Marcadores";
import firebase from "../firebase/firebaseClient";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";

export async function getServerSideProps() {
  const snapshot = await firebase.firestore().collection("users").get();
  let users = snapshot.docs.map((doc) => doc.data());

  return {
    props: {
      users,
    },
  };
}

export default function TablaDeMarcadores({ users }) {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const router = useRouter();
  useEffect(() => {
    if (!_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading, router]);
  return (
    <>
      <Head>
        <title>La Quiniela de Arturo | Tabla de Posiciones</title>
        <meta
          name="description"
          content="Tabla de Posiciones de La Quiniela de Arturo de la Copa Mundial de la FIFA 2022"
        />
      </Head>
      <Marcadores users={users} />{" "}
    </>
  );
}
