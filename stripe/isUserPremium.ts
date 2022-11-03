import firebase from "../firebase/firebaseClient";

export default async function isUserPremium(): Promise<boolean> {
  await firebase.auth().currentUser?.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser?.getIdTokenResult();

  const uid = decodedToken?.claims?.user_id;

  const querySnapshot = await firebase.firestore().collection('users').doc(uid).collection("payments").limit(1).get() 

  const userDoc = await !querySnapshot.empty && querySnapshot.docs[0].data();

  return userDoc?.status === "succeeded" ? true : false;
}
