import React, { ReactElement, useState, useEffect } from "react";
import firebase from "../firebase/firebaseClient";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { FcGoogle } from "react-icons/fc";
import Alert from "@mui/material/Alert";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/logo.png";
import toast, { Toaster } from "react-hot-toast";
import quiniela from "../quiniela.json";
import { useStateContext } from "../context/PremiumContext";

interface Props {}

export default function Login({}: Props): ReactElement {
  const regex = new RegExp(
    "^((?!verg)(?!put)(?!coñ)(?!pende)(?!mamad)(?!guaps)(?!concha)(?!nig)(?!fag)(?!pinch)(?!fuck)(?!shit)(?!cabron)(?!cabrón)(?!ching)(?!mame)(?!nig)(?!cunt)(?!gay)(?!homo)(?!dike)(?!lesb)(?!mierd)(?!kike)(?!vagi)(?!peni)(?!pene)(?!ñong)(?!feg)(?!jew)(?!pito)(?!cul)(?!anal)(?!ano)(?!negro).)*$",
    "i"
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const { _user, userLoading } = useStateContext();

  async function signInWithGoogle() {
    const userCredentials = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());

    // check if user doc exists
    const userDoc = await firebase
      .firestore()
      .collection("users")
      .doc(userCredentials.user.uid)
      .get();

    if (!userDoc.exists) {
      // create user doc
      await firebase
        .firestore()
        .collection("users")
        .doc(userCredentials.user.uid)
        .set({
          uid: userCredentials.user.uid,
          email: userCredentials.user.email,
          name: userCredentials.user.displayName,
          provider: userCredentials.user.providerData[0].providerId,
          photoUrl: userCredentials.user.photoURL,
          puntos: 0,
        });
    }

    // check if collection quiniela exists
    const quinielaRef = firebase
      .firestore()
      .collection("users")
      .doc(userCredentials.user.uid)
      .collection("quiniela")
      .doc("resultados");

    const doc = await quinielaRef.get();

    if (!doc.exists) {
      quinielaRef.set({
        resultados: quiniela,
      });
    } else {
    }
  }

  const photos = [
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi1r50NO9EQLfZ2Y3WRrBih6JF2rBJa2qCPMPZ85UL8HM8-hjz1ykE--eBUvaxCTo71ndRZmAmn9oGYKIiD0uTS0C08CLnVfJ4he8f7cYYL7NOcx6LirKt3sHUFF-auHWuRRTklkd_3qwKfyv6IDiZMLQ4kem6tIPAJhwW04zaoCok3LD8GTdDMBAe6lw/s754/La%20eeb.jpg",
    "https://media.sitioandino.com.ar/p/8b1b12b414df867a70caef8f45ead9a5/adjuntos/335/imagenes/000/215/0000215390/790x0/smart/la-mascota-oficial-del-mundialjpg.jpg",
    "/qatar-pp.png",
    "/world-cup.png",
    "/pp_ball.jpg",
  ];

  const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

  async function signUpwithEmail(e) {
    e.preventDefault();
    if (regex.test(name) && regex.test(familyName) && regex.test(email)) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              uid: user.uid,
              email: user.email,
              name: `${name} ${familyName}`,
              provider: user.providerData[0].providerId,
              photoUrl: randomPhoto,
              puntos: 0,
            });
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .collection("quiniela")
            .doc("resultados")
            .set({
              resultados: quiniela,
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);

          const translate = {
            "The email address is already in use by another account.":
              "Este correo ya está en uso",
            "The email address is badly formatted.":
              "El formato del correo electrónico es incorrecto.",
            "The password must be 6 characters long or more.":
              "La contraseña debe tener 6 caracteres o más.",
            "Password should be at least 6 characters":
              "La contraseña debe tener 6 caracteres o más.",
          };

          setTimeout(() => {
            toast.error(translate[errorMessage]);
          }, 100);
        });
    } else {
      alert("No se permiten palabras malsonantes");
    }
  }

  // get email and password from user
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFamilyNameChange = (e) => {
    setFamilyName(e.target.value);
  };

  const router = useRouter();

  useEffect(() => {
    if (_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading, router]);

  return (
    <>
      {errorMessage && <Toaster position="top-center" reverseOrder={false} />}
      <div className="h-screen">
        <div className="flex min-h-full items-center justify-center">
          <div className=" bg-white rounded-2xl shadow-xl p-8 lg:px-32">
            <div className="w-full max-w-md space-y-8 ">
              <div>
                <div className="flex justify-center items-center">
                  <Image
                    src={logo}
                    alt="Qatar 2022"
                    width={156}
                    height={156}
                    priority
                  />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Regístrate
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  o{" "}
                  <Link href="/login">
                    <a className="font-medium text-[#630e2a] hover:text-opacity-75 focus:text-opacity-75">
                      ¿ya tienes una cuenta? Inicia sesión aquí
                    </a>
                  </Link>
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={signUpwithEmail}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Nombre
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="name"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#630E2B] focus:outline-none focus:ring-[#630E2B] sm:text-sm"
                      placeholder="Nombre"
                      onChange={handleNameChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="sr-only">
                      Apellido
                    </label>
                    <input
                      id="apellido"
                      name="apellido"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#630E2B] focus:outline-none focus:ring-[#630E2B] sm:text-sm"
                      placeholder="Apellido"
                      onChange={handleFamilyNameChange}
                    />
                  </div>
                </div>
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Correo
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#630E2B] focus:outline-none focus:ring-[#630E2B] sm:text-sm"
                      placeholder="Correo"
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#630E2B] focus:outline-none focus:ring-[#630E2B] sm:text-sm"
                      placeholder="Contraseña"
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#630E2B] py-2 px-4 text-sm font-medium text-white hover:bg-[#5b0d27] focus:outline-none focus:ring-2 focus:ring-[#3e091b] focus:ring-offset-2 shadow-lg transition ease-in duration-200 hover:shadow-xl "
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-rose-700 group-hover:text-rose-600 transition ease-in-out duration-150"
                        aria-hidden="true"
                      />
                    </span>
                    Registrarse
                  </button>
                  <button
                    type="button"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-200 py-2 px-4 text-sm font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mt-2 shadow-lg transition ease-in duration-200 hover:shadow-xl"
                    onClick={() => signInWithGoogle()}
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <FcGoogle className="h-5 w-5" />
                    </span>
                    Registrarse con Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
