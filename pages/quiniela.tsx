import React from "react";
import QuinielaLlenar from "../components/QuinielaLlenar";

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
  return (
    <div>
      <QuinielaLlenar data={data} />
    </div>
  );
}
