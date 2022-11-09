import Marcadores from "../components/Marcadores";
import firebase from "../firebase/firebaseClient";

export async function getServerSideProps() {
  const snapshot = await firebase.firestore().collection("users").get();
  let users = snapshot.docs.map((doc) => doc.data());

  return {
    props: {
      users,
    },
  };
}

export default function TablaDeMarcadores({ users }) {
  return <Marcadores users={users} />;
}
