import React from "react";
import Login from "../components/Login";
import Head from "next/head";

type Props = {};

const login = (props: Props) => {
  return (
    <>
      <Head>
        <title>La Quiniela de Arturo | Inicia Sesión </title>
        <meta
          name="description"
          content={`Inicia Sesión para acceder a La Quiniela de Arturo de la Copa Mundial de la FIFA 2022`}
        />
      </Head>
      <Login />
    </>
  );
};

export default login;
