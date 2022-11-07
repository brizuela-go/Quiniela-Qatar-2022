import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";

const Layout = ({ children }) => {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const [userPhoto, setUserPhoto] = React.useState("");
  const userIsPremium = usePremiumStatus(_user);

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
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  return (
    <div>
      <Head>
        <title>La Quiniela Qatar 2022</title>
        <link rel="icon" href="/logo.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </Head>
      <header>
        {_user && !userLoading && userIsPremium && (
          <Navbar _user={_user} userPhoto={userPhoto} />
        )}
      </header>
      <main>{children}</main>
      <footer>{_user && !userLoading && userIsPremium && <Footer />}</footer>
    </div>
  );
};

export default Layout;
