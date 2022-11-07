import React, { useEffect } from "react";
import QuinielaLlenar from "../components/QuinielaLlenar";
import { useRouter } from "next/router";
import usePremiumStatus from "../stripe/usePremiumStatus";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

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
  const userIsPremium = usePremiumStatus(_user);

  return (
    <>
      {userIsPremium ? (
        <QuinielaLlenar data={data} />
      ) : (
        <div className="animate__animated animate__fadeIn animate__delay-2s flex justify-center flex-col items-center mt-40 text-center p-10">
          <h1 className="text-2xl font-semibold">
            Todavía no tienes acceso a esta página
          </h1>
          <Link href="/">
            <a className=" underline">Regresar al menú de pagos</a>
          </Link>
        </div>
      )}
    </>
  );
}
