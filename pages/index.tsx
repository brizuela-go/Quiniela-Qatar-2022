import { useEffect, useState } from "react";
import firebase from "../firebase/firebaseClient";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useStateContext } from "../context/PremiumContext";
import { FaUsers } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa";

import { BsWhatsapp } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import Link from "next/link";

const icons = {
  amex: "/AMEX.svg",
  applePay: "/APPLE_PAY.svg",
  mastercard: "/MASTER_CARD.svg",
  visa: "/VISA.svg",
  oxxo: "https://js.stripe.com/v3/fingerprinted/img/oxxo-96b6ab36d23607973cb466bec56d187b.svg",
};

export default function Home() {
  const [name, setName] = useState("");
  const { userIsPremium, _user, userLoading } = useStateContext();

  // get lenght of users collection in firestore
  const [users, setUsers] = useState(0);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) => {
        setUsers(snapshot.size);
      });
    return () => unsubscribe();
  }, []);

  firebase
    .firestore()
    .collection("users")
    .doc(_user?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setName(doc.data().name);
      } else {
        // doc.data() will be undefined in this case
      }
    })
    .catch((error) => {});

  const router = useRouter();

  useEffect(() => {
    if (!_user) {
      router.push("/login");
    }
  }, [_user, router]);

  async function signOut() {
    await firebase.auth().signOut();
  }

  function reloadPage() {
    router.reload();
  }

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {_user && (
        <div className="">
          {userIsPremium ? (
            <div className="animate__animated animate__fadeIn ">
              <div className="sm:flex sm:justify-center sm:flex-row  flex-col m-12  gap-x-12 space-y-6 sm:space-y-0">
                <div className=" bg-white shadow-lg  rounded-xl p-4">
                  <div className="flex justify-between space-x-5">
                    <div>
                      <h4 className=" font-normal">Usuarios Registrados</h4>
                      <h4 className="font-bold">{users}</h4>
                    </div>
                    <div>
                      <FaUsers className="text-4xl text-gray-800" />
                    </div>
                  </div>
                </div>
                <div className=" bg-white shadow-lg  rounded-xl p-4 ">
                  <div className="flex justify-between space-x-5">
                    <div>
                      <h4 className=" font-normal">Premio por Repartir</h4>
                      <h4 className="font-bold ">${users * 225}</h4>
                    </div>
                    <div>
                      <FaPiggyBank className="text-4xl text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:m-10 flex flex-col justify-center items-center my-10 mx-0 gap-y-20">
                <Card sx={{ maxWidth: "70%" }}>
                  <Link passHref href={`/quiniela/${_user?.uid}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image="/quiniela.png"
                        alt="quiniela"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Mi Quiniela
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          Ve tu quiniela
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
                <Card sx={{ maxWidth: "70%" }}>
                  <Link passHref href={`/marcadores`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image="/resultados.jpg"
                        alt="quiniela"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Marcadores
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ver la tabla de posiciones
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </div>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn animate__delay-2s  bg-[url('/cup.jpg')] bg-cover   h-screen">
              {/* card */}
              <div className="flex flex-col items-center justify-center h-full ">
                <div className="bg-white rounded-lg shadow-xl p-10 animate__animated animate__fadeIn animate__delay-2s mx-4">
                  <h1 className="lg:text-4xl text-3xl font-bold mb-5 animate__animated animate__fadeIn animate__delay-3s text-center">
                    Llegaste tarde...
                  </h1>
                  <p className="text-gray-700 mb-5 text-center  animate__animated animate__fadeIn animate__delay-4s text-base font-medium">
                    <Typewriter
                      options={{
                        strings: [
                          "¡Bienvenid@ a la Quiniela de Arturo para Qatar 2022!",
                          "Llegaste muy tarde y desafortunadamente ya no puedes participar",
                          `¡Se registraron ${users} usuarios!`,
                          `¡El premio para el primer lugar es de $${Math.round(
                            users * 225 * 0.6
                          )} pesos!`,
                          `¡El premio para el segundo lugar es de $${Math.round(
                            users * 225 * 0.3
                          )} pesos!`,
                          `¡El premio para el tercer lugar es de $${Math.round(
                            users * 225 * 0.1
                          )} pesos!`,
                        ],
                        autoStart: true,
                        delay: 40,
                        deleteSpeed: 45,
                        loop: true,
                      }}
                    />
                  </p>
                  {/* <div className="flex justify-center gap-4">
                    <button
                      className=" bg-gradient-to-r from-violet-600 to-violet-800 hover:bg-blue-600 text-white font-bold py-2 px-5 lg:px-8 rounded shadow-lg hover:shadow-xl transition duration-200 hover:via-violet-700 hover:to-violet-900 focus:from-violet-800 focus:to-violet-900 animate__animated animate__fadeIn animate__delay-5s text-sm"
                      onClick={() =>
                        setTimeout(() => {
                          toast.promise(createCheckoutSession(_user.uid), {
                            loading: "Creando sesión de pago...",
                            success: "Redireccionando",
                            error: "Error",
                          });
                        }, 1000)
                      }
                    >
                      Pago Seguro
                    </button>
                    <button
                      className=" bg-gradient-to-r from-red-600 to-red-800  text-white font-bold py-2 px-5 lg:px-8 rounded shadow-lg hover:shadow-xl transition duration-200 hover:via-red-800 hover:to-red-900 animate__animated animate__fadeIn animate__delay-5s text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText("002668082674240560");
                        toast.success("¡CLABE Copiada!");
                      }}
                    >
                      <MdContentCopy className="inline-block text-white mr-1" />{" "}
                      Copiar CLABE
                    </button>
                  </div> */}
                  <div className="flex justify-center animate__animated animate__fadeIn animate__delay-5s mt-10">
                    <p className=" text-gray-900 text-center text-sm ">
                      ¿Estás registrado y terminaste aquí por error? Refresca la
                      página o{" "}
                      <button
                        onClick={reloadPage}
                        className="focus:underline hover:underline text-rose-900"
                      >
                        haz click aquí
                      </button>
                    </p>
                  </div>
                  <div className="flex  flex-col justify-center items-center mt-7 animate__animated animate__fadeIn animate__delay-5s">
                    <Link href="https://wa.me/522213321516">
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className=" bg-gradient-to-r from-green-400  to-green-500 p-2 rounded-full shadow-xl hover:shadow-2xl transition duration-200 hover:via-green-500 hover:to-green-600"
                      >
                        <BsWhatsapp className="text-xl text-white" />
                      </a>
                    </Link>
                  </div>
                  {/* {icons && (
                    <div className="flex justify-center gap-2 mt-5 ">
                      {Object.keys(icons).map((icon) => (
                        <Image
                          key={icon}
                          src={icons[icon]}
                          alt={icon}
                          width={32}
                          height={32}
                          className="animate__animated animate__fadeIn animate__delay-5s"
                        />
                      ))}
                    </div>
                  )} */}
                  <div className=" flex justify-center mt-4">
                    <button
                      onClick={signOut}
                      className="underline text-gray-500 text-center text-xs hover:text-gray-700 focus:text-gray-800"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
