import React, { useEffect } from "react";
import QuinielaLlenar from "../../components/QuinielaLlenar";
import { useRouter } from "next/router";
import { getUserDetails, getUserQuiniela } from "../../firebase/utils";
import Head from "next/head";
import { useStateContext } from "../../context/PremiumContext";

export async function getServerSideProps({ query }) {
  const res = await fetch(
    "https://quiniela-qatar-2022.vercel.app/api/faseDeGrupos"
  );
  const data = await res.json();

  const uid = query["user"];

  let userData = (await getUserQuiniela(uid)) || null;

  let userDetails = (await getUserDetails(uid)) || null;

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
      userDetails,
    },
  };
}

export default function Quiniela({ data, locales, visitantes, userDetails }) {
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
        <title>Quiniela de {userDetails.name}</title>
        <meta
          name="description"
          content={`Quiniela de ${userDetails.name} de La Quiniela de Arturo para la Copa Mundial de la FIFA 2022`}
        />
      </Head>
      <QuinielaLlenar
        data={data}
        locales={locales}
        visitantes={visitantes}
        userDetails={userDetails}
      />
    </>
  );
}
