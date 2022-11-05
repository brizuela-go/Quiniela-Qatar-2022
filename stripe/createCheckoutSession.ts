import firebase from "../firebase/firebaseClient";
import initializeStripe from "./initializeStripe";
import toast from "react-hot-toast";

export async function createCheckoutSession(uid: string) {
  const firestore = firebase.firestore();

  // Create a new checkout session in the subollection inside this users document
  const checkoutSessionRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      mode: "payment",
      price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      // We have a session, let's redirect to Checkout
      // Init Stripe
      const stripe = await initializeStripe();
      stripe.redirectToCheckout({ sessionId });
      toast.loading("Redireccionando al pago...");
  
    }
  });
}
