import React from "react";
import Register from "../components/Register";
import Head from "next/head";

type Props = {};

const register = (props: Props) => {
  return (
    <>
      <Head>
        <title>La Quiniela de Arturo | Regístrate </title>
        <meta
          name="description"
          content={`Regístrate en La Quiniela de Arturo de la Copa Mundial de la FIFA 2022`}
        />
      </Head>
      <Register />;
    </>
  );
};

export default register;
