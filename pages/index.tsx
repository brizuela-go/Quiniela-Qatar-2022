import { useEffect, useState } from "react";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { createCheckoutSession } from "../stripe/createCheckoutSession";
import usePremiumStatus from "../stripe/usePremiumStatus";
import { useRouter } from "next/router";

export default function Home() {
  const [user, userLoading] = useAuthState(firebase.auth());
  const [name, setName] = useState("");
  const userIsPremium = usePremiumStatus(user);

  async function signOut() {
    await firebase.auth().signOut();
  }

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
      {user && !userLoading && (
        <div>
          {userIsPremium ? (
            <>
              <h1>¡Empieza a llenar tu quiniela, {name.split(" ")[0]}!</h1>
              <button className="" onClick={signOut}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="animate__animated animate__fadeIn animate__delay-1s">
              <h1>Hola {name}</h1>
              <br />
              <h2>
                Bienvenido a la quiniela de Arturo para el mundial de Qatar 2022
              </h2>
              <br />
              <button onClick={() => createCheckoutSession(user.uid)}>
                Pagar con Stripe
              </button>
              <br />
              <br />
              <button>Pagar con PayPal</button>
              <br />
              <br />
              <br />
              <h3>
                Puedes depositar a la siguiente cuenta si lo prefieres:
                123123123123
              </h3>
              <br />
              <h3>
                Si ya pagaste en efectivo o depositaste, espera a que tu usuario
                se dado de alta
              </h3>
              <button onClick={signOut}>Cerrar Sesión</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
