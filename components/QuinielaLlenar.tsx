import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GiSoccerField } from "react-icons/gi";
import { BiTimeFive } from "react-icons/bi";
// import firebase from "../firebase/firebaseClient";
import { useRouter } from "next/router";
// import toast, { Toaster } from "react-hot-toast";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import Fab from "@mui/material/Fab";
import { useStateContext } from "../context/PremiumContext";
// import Tooltip from "@mui/material/Tooltip";

const QuinielaLlenar = ({ data, locales, visitantes, userDetails, flags }) => {
  // const [local, setLocal] = useState(locales);
  // const [visitante, setVisitante] = useState(visitantes);
  // const [edit, setEdit] = useState(true);

  const { _user, userIsPremium } = useStateContext();

  const router = useRouter();

  const uid = router.query.user;

  // get user name from firebase
  const userName = userDetails?.name;

  // const resultados = {};

  // async function saveResults(e) {
  //   e.preventDefault();
  //   const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();
  //   const uid = decodedToken?.claims?.user_id;
  //   const db = firebase.firestore();

  //   const quiniela = db
  //     .collection("users")
  //     .doc(uid)
  //     .collection("quiniela")
  //     .doc("resultados");

  //   quiniela.set({
  //     resultados: resultados,
  //   });
  //   setEdit(true);
  //   toast.success("Resultados Guardados con Éxito");
  // }

  // async function editResults() {
  //   setEdit(false);
  //   toast("Modo Edición", {
  //     icon: "🖊️",
  //   });
  // }

  // const handleChangeLocal = (e, i) => {
  //   const { value, name } = e.target;

  //   const newState = [...local];
  //   newState[i] = {
  //     ...newState[i],
  //     [name]: value,
  //   };

  //   setLocal(newState);
  // };

  // const handleChangeVisitante = (event, i) => {
  //   const { value, name } = event.target;

  //   const newState = [...visitante];
  //   newState[i] = {
  //     ...newState[i],
  //     [name]: value,
  //   };

  //   setVisitante(newState);
  // };

  // for (let i = 1; i < local.length; i++) {
  //   resultados[i] = { local: local[i], visitante: visitante[i] };
  // }

  useEffect(() => {
    if (userIsPremium === false) {
      router.push("/");
    }
  }, [userIsPremium, router]);

  return (
    <>
      <div>
        {_user?.uid !== uid && (
          <div className="flex justify-center text-center">
            <h1 className="text-xl font-bold mt-10">Quiniela de {userName} </h1>
          </div>
        )}
        {_user?.uid === uid && (
          <div className="flex justify-center text-center">
            <h1 className="text-xl font-bold mt-10">Tu quiniela </h1>
          </div>
        )}
        <div className={"rounded-lg bg-white shadow-lg lg:m-8 m-3 "}>
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
                    <>
                      <div key={j} className="lg:block hidden">
                        <div className="grid grid-cols-3 p-3 " key={j}>
                          <h4 className="justify-self-start">
                            {partido["Group"]}
                          </h4>
                          <div className="grid grid-cols-5">
                            <input
                              id={i}
                              type="number"
                              value={parseInt(
                                locales[partido["partido"]]?.[
                                  partido["HomeTeam"]
                                ]
                              )}
                              className="w-12 h-7 pr-0 pl-2 text-center border lg:-ml-8 ml-ipad shadow-lg border-double border-gray-400 font-semibold disabled:shadow-md disabled:bg-gray-100 disabled:border-none "
                              disabled //={edit}
                              placeholder="#"
                              name={partido["HomeTeam"]}
                              required
                              step={1}
                              min={0}
                              max={20}
                              // onChange={(e) => handleChangeLocal(e, i)}
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
                                  alt={partido["AwayTeam"]}
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
                              className="w-12 h-7 pr-0 pl-2 ml-20  text-center shadow-lg border-double border-gray-400 font-semibold disabled:shadow-md disabled:bg-gray-100 disabled:border-none"
                              placeholder="#"
                              value={parseInt(
                                visitantes[partido["partido"]]?.[
                                  partido["AwayTeam"]
                                ]
                              )}
                              name={partido["AwayTeam"]}
                              step={1}
                              min={0}
                              max={20}
                              disabled //={edit}
                              required
                              // onChange={(e) => handleChangeVisitante(e, i)}
                            />
                          </div>
                          <div className=" justify-self-end">
                            <h4>{partido["Location"]}</h4>
                          </div>
                        </div>
                      </div>
                      <div key={`${j} + small`} className="lg:hidden">
                        <div className="m-3 my-8 shadow-lg p-3">
                          <h4 className="flex justify-start  mb-5">
                            {partido["Group"]}
                          </h4>
                          <div className="flex justify-between mb-6">
                            <div className="flex justify-start gap-6">
                              <div className="h-12 w-12 ">
                                <Image
                                  src={flags[partido["HomeTeam"]]}
                                  alt={partido["HomeTeam"]}
                                  width={48}
                                  height={48}
                                  quality={100}
                                />
                              </div>
                              <h4 className="mt-2 text-lg">
                                {partido["HomeTeam"]}
                              </h4>
                            </div>

                            <input
                              id={i}
                              type="number"
                              value={parseInt(
                                locales[partido["partido"]]?.[
                                  partido["HomeTeam"]
                                ]
                              )}
                              className="w-12 border  text-center shadow-xl border-double border-gray-400 font-semibold disabled:shadow-xl disabled:bg-gray-200 disabled:border-none disabled:text-black"
                              disabled //={edit}
                              placeholder="#"
                              name={partido["HomeTeam"]}
                              required
                              step={1}
                              min={0}
                              max={20}
                              // onChange={(e) => handleChangeLocal(e, i)}
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex justify-start  gap-6 ">
                              <div className="h-12 w-12 ">
                                <Image
                                  src={flags[partido["AwayTeam"]]}
                                  alt={partido["AwayTeam"]}
                                  width={48}
                                  height={48}
                                  quality={100}
                                />
                              </div>
                              <h4 className="mt-2 text-lg">
                                {partido["AwayTeam"]}
                              </h4>
                            </div>

                            <input
                              id={i}
                              type="number"
                              value={parseInt(
                                visitantes[partido["partido"]]?.[
                                  partido["AwayTeam"]
                                ]
                              )}
                              className="w-12 border  text-center shadow-xl border-double border-gray-400 font-semibold disabled:shadow-xl disabled:bg-gray-200 disabled:border-none disabled:text-black"
                              disabled //={edit}
                              placeholder="#"
                              name={partido["AwayTeam"]}
                              required
                              step={1}
                              min={0}
                              max={20}
                              // onChange={(e) => handleChangeVisitante(e, i)}
                            />
                          </div>

                          <div className="flex justify-center gap-4 text-sm">
                            <div className="mt-5">
                              <div className=" flex justify-center ">
                                <GiSoccerField />
                              </div>
                              <div className=" flex justify-center ">
                                <h4>{partido["Location"]}</h4>
                              </div>
                            </div>
                            <h4 className=" text-xl mt-6">|</h4>
                            <div className="mt-5">
                              <div className=" flex justify-center ">
                                <BiTimeFive />
                              </div>
                              <div className=" flex justify-center ">
                                <h4>{partido["TimeUtc"]}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuinielaLlenar;
