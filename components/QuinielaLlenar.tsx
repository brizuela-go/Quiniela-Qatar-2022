import { useState } from "react";
import flags from "../flags.json";
import Image from "next/image";
import { GiSoccerField } from "react-icons/gi";
import firebase from "../firebase/firebaseClient";

type Props = {};

const QuinielaLlenar = ({ data }) => {
  const [local, setLocal] = useState([]);
  const [visitante, setVisitante] = useState([]);

  async function saveResults(local, visitante) {
    const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();
    const uid = decodedToken?.claims?.user_id;
    const db = firebase.firestore();
    const quiniela = db.collection("users").doc(uid).collection("quiniela");
    quiniela.doc("resultados").set({
      local: local,
      visitante: visitante,
    });
  }

  const handleChangeLocal = (e, i) => {
    const { value, name } = e.target;

    const newState = [...local];
    newState[i] = {
      ...newState[i],
      [name]: value,
    };

    console.log(newState);
    setLocal(newState);
  };

  const handleChangeVisitante = (e) => {
    setVisitante(e.target.value);
  };

  console.log({ local, visitante });

  return (
    <div>
      <form className=" rounded-lg bg-white shadow-lg lg:m-10 m-3 ">
        <div className="flex flex-row justify-center items-center bg-gradient-to-r from-[#4D0822] via-[#7C1330] to-[#4D0822]  p-3">
          <h2 className="text-[#e5bdd0] text-2xl">Fase de Grupos</h2>
        </div>
        {data.map((ronda) => (
          <div key={ronda.id}>
            <div className="flex flex-row justify-center items-center mt-8 ">
              <h2 className="text-2xl font-medium">Ronda {ronda.Ronda}</h2>
            </div>
            {ronda.data.map((fecha, i) => (
              <div key={i}>
                <div
                  className=" bg-gradient-to-r from-[#F0F0F5] to-[#F0F0F5] p-2 flex flex-row justify-center"
                  key={i}
                >
                  <h3 className="text-[#61607A]">{ronda.data[i].Fecha}</h3>
                </div>
                {ronda.data[i].data.map((partido, j) => (
                  <div key={j}>
                    <div className="grid grid-cols-3 p-2 " key={j}>
                      <h4 className="justify-self-start">{partido["Group"]}</h4>
                      <div className="grid grid-cols-5">
                        <input
                          id={i}
                          type="number"
                          className="w-12 border -ml-8 text-center"
                          placeholder="#"
                          required
                          onChange={(e) => handleChangeLocal(e, i)}
                        />
                        <div className="flex justify-end gap-4 -ml-20 ">
                          <h4 className="flex justify-self-end  text-end">
                            {partido["HomeTeam"]}
                          </h4>
                          <div className="h-6 w-6 flex justify-end">
                            <Image
                              src={flags[partido["HomeTeam"]]}
                              alt={partido["HomeTeam"]}
                              width={48}
                              height={48}
                              quality={100}
                              priority
                            />
                          </div>
                        </div>
                        <h4 className="justify-self-center  bg-[#F0F0F5] px-4 rounded-xl">
                          {partido["TimeUtc"]}
                        </h4>
                        <div className="flex justify-start gap-4 -mr-16">
                          <div className="h-6 w-6 ">
                            <Image
                              src={flags[partido["AwayTeam"]]}
                              alt={partido["HomeTeam"]}
                              width={48}
                              height={48}
                              className=""
                            />
                          </div>
                          <h4>{partido["AwayTeam"]}</h4>
                        </div>
                        <input
                          id={i}
                          type="number"
                          className="w-12 border ml-20  text-center"
                          placeholder="#"
                          onChange={handleChangeVisitante}
                          required
                        />
                      </div>
                      <div className=" justify-self-end">
                        <h4>{partido["Location"]}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuinielaLlenar;
