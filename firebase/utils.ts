import firebase from './firebaseClient';

export function postToJson(doc) {
    const data = doc.data();
    return data ? { ...data } : null;
}

export async function getUserDetails (uid: string) {
    const userDoc = await firebase.firestore().collection('users').doc(uid).get();
    const user = await userDoc.data();
    return user;
}