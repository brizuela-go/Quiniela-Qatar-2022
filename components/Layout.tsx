import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";
import { useStateContext } from "../context/PremiumContext";

const Layout = ({ children }) => {
  const [userPhoto, setUserPhoto] = React.useState("");
  const { _user, userLoading, userIsPremium } = useStateContext();

  const router = useRouter();

  firebase
    .firestore()
    .collection("users")
    .doc(_user?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setUserPhoto(doc.data().photoUrl);
      } else {
        // doc.data() will be undefined in this case
      }
    })
    .catch((error) => {});

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://widgets.sportmonks.com/js/world-cup/livescore.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const script2 = document.createElement("script");

    script2.src =
      "https://widgets.sportmonks.com/js/world-cup/standingsSlider.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script2);
  }, []);

  return (
    <body>
      <Head>
        <title>La Quiniela de Arturo Qatar 2022</title>
        <link rel="icon" href="/logo.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://widgets.sportmonks.com/css/app.css"
        />
        <meta
          name="description"
          content="La Quiniela de Arturo de la Copa Mundial de la FIFA 2022"
        />
      </Head>

      <header>
        {_user && !userLoading && userIsPremium && (
          <Navbar _user={_user} userPhoto={userPhoto} />
        )}
      </header>
      <main>{children}</main>

      <div className={router.pathname !== "/" && "hidden"}>
        <div className=" m-8"></div>
      </div>

      <footer>{_user && !userLoading && userIsPremium && <Footer />}</footer>
      <script
        type="text/javascript"
        src="https://widgets.sportmonks.com/js/world-cup/livescore.js"
      ></script>
      <script
        type="text/javascript"
        src="https://widgets.sportmonks.com/js/world-cup/standingsSlider.js"
      ></script>
    </body>
  );
};

export default Layout;
