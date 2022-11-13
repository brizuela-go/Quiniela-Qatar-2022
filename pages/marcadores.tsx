import React, { useEffect } from "react";
import Marcadores from "../components/Marcadores";
import firebase from "../firebase/firebaseClient";
import { useRouter } from "next/router";
import Head from "next/head";
import { useStateContext } from "../context/PremiumContext";

export async function getServerSideProps() {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .orderBy("puntos", "desc")
    .get();
  let users = snapshot.docs.map((doc) => doc.data());

  const snapshot2 = await firebase
    .firestore()
    .collection("resultados")
    .doc("mhHvk0BDGehDfhoAQzYvJ3i1TVS2")
    .get();
  let resultados = snapshot2.data();

  const snapshot3 = await firebase
    .firestore()
    .collection("users")
    .orderBy("puntos", "desc")
    .get();

  // retrieve all the "quiniela" collections from snapshot3
  const quinielas = await Promise.all(
    snapshot3.docs.map(async (doc) => {
      const quiniela = await doc.ref.collection("quiniela").get();
      return quiniela.docs.map((doc) => doc.data());
    })
  );

  let usersQuiniela = quinielas.flat().flat();

  return {
    props: {
      users,
      resultados,
      usersQuiniela,
    },
  };
}

export default function TablaDeMarcadores({
  users,
  resultados,
  usersQuiniela,
}) {
  const { _user, userLoading } = useStateContext();

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
      <Marcadores
        users={users}
        resultados={resultados.resultados}
        usersQuiniela={usersQuiniela}
      />
    </>
  );
}
