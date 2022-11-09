import firebase from "./firebaseClient";

export function postToJson(doc) {
  const data = doc.data();
  return data ? { ...data } : null;
}

export async function getUserDetails(uid: string) {
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  const user = await userDoc.data();
  return user;
}

export async function getUserQuiniela(uid: string) {
  const userDoc = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("quiniela")
    .doc("resultados")
    .get();
  const user = await userDoc.data().resultados;
  return user;
}

export async function checkUserPremium(uid: string) {
  const querySnapshot = await firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("payments")
    .limit(1)
    .get();

  const userDoc = (await !querySnapshot.empty) && querySnapshot.docs[0].data();

  return userDoc?.status === "succeeded" ? true : false;
}
