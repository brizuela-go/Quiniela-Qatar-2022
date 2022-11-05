import { useEffect, useState } from "react";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useRouter } from "next/router";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

import { BsWhatsapp } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";

import Link from "next/link";

const icons = {
  amex: "/AMEX.svg",
  applePay: "/APPLE_PAY.svg",
  mastercard: "/MASTER_CARD.svg",
  visa: "/VISA.svg",
};

export default function Home() {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [name, setName] = useState("");
  const userIsPremium = usePremiumStatus(user);

  async function signOut() {
    await firebase.auth().signOut();
  }

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
    .doc(user?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        setName(doc.data().name);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/login");
    }
  }, [user, userLoading]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      {user && !userLoading && (
        <div>
          {userIsPremium ? (
            <div>
              <h1>¡Empieza a llenar tu quiniela, {name.split(" ")[0]}!</h1>
              <button className="" onClick={signOut}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="animate__animated animate__fadeIn animate__delay-2s bg-[url('/cup.jpg')] bg-cover bg-fixed bg-center h-screen">
              {/* card */}
              <div className="flex flex-col items-center justify-center h-full ">
                <div className="bg-white rounded-lg shadow-xl p-10 animate__animated animate__fadeIn animate__delay-2s mx-4">
                  <h1 className="lg:text-4xl text-3xl font-bold mb-5 animate__animated animate__fadeIn animate__delay-3s text-center">
                    ¡Hola, {name}!
                  </h1>
                  <p className="text-gray-700 mb-5 text-center text-base animate__animated animate__fadeIn animate__delay-3s">
                    <Typewriter
                      options={{
                        strings: [
                          "¡Bienvenid@ a la Quiniela de Arturo para Qatar 2022!",
                          `¡Ya van ${users} usuarios registrados!`,
                          "Entre más usuarios se registren, mejores serán los premios.",
                          `¡El premio para el primer lugar es de $${Math.round(
                            users * 225 * 0.65
                          )} pesos!`,
                          `¡El premio para el segundo lugar es de $${Math.round(
                            users * 225 * 0.225
                          )} pesos!`,
                          `¡El premio para el tercer lugar es de $${Math.round(
                            users * 225 * 0.125
                          )} pesos!`,
                        ],
                        autoStart: true,
                        delay: 40,
                        deleteSpeed: 45,
                        loop: true,
                      }}
                    />
                    {/* <Typed
                      strings={[
                        "¡Bienvenid@ a la Quiniela de Arturo para Qatar 2022!",
                        `¡Ya van ${users} usuarios registrados!`,
                        "Entre más usuarios se registren, mayor será el premio.",
                        `¡El premio para el primer lugar es de $${Math.round(
                          users * 225 * 0.65
                        )} pesos!`,
                        `¡El premio para el segundo lugar es de $${Math.round(
                          users * 225 * 0.225
                        )} pesos!`,
                        `¡El premio para el tercer lugar es de $${Math.round(
                          users * 225 * 0.125
                        )} pesos!`,
                      ]}
                      typeSpeed={25}
                      backSpeed={35}
                      backDelay={2000}
                      startDelay={1500}
                      loop
                    ></Typed> */}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      className=" bg-gradient-to-r from-violet-600 to-violet-800 hover:bg-blue-600 text-white font-bold py-2 px-5 lg:px-8 rounded shadow-lg hover:shadow-xl transition duration-200 hover:via-violet-700 hover:to-violet-900 focus:from-violet-800 focus:to-violet-900 animate__animated animate__fadeIn animate__delay-5s text-sm"
                      onClick={() => createCheckoutSession(user.uid)}
                    >
                      Pagar con Tarjeta
                    </button>
                    <button
                      className=" bg-gradient-to-r from-red-600 to-red-800  text-white font-bold py-2 px-5 lg:px-8 rounded shadow-lg hover:shadow-xl transition duration-200 hover:via-red-800 hover:to-red-900 animate__animated animate__fadeIn animate__delay-5s text-sm"
                      onClick={() => {
                        navigator.clipboard.writeText("014650250101695364");
                        toast.success("¡CLABE Copiada!");
                      }}
                    >
                      <MdContentCopy className="inline-block text-white mr-1" />{" "}
                      Copiar CLABE
                    </button>
                  </div>

                  <div className="flex  flex-col justify-center items-center mt-7 animate__animated animate__fadeIn animate__delay-5s">
                    <p className="text-gray-500 text-center text-xs">
                      ¿Ya pagaste tu quiniela?
                    </p>
                    <p className="text-gray-500 mb-3 text-center text-xs">
                      Mándanos un mensaje por WhatsApp con tu comprobante para
                      activar tu cuenta.
                    </p>
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
                  {icons && (
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
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
