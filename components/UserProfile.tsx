import React, { useEffect } from "react";
import Image from "next/image";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import usePremiumStatus from "../stripe/usePremiumStatus";
import Link from "next/link";

type Props = {};

const UserProfile = ({ user }) => {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const userIsPremium = usePremiumStatus(_user);

  const router = useRouter();

  useEffect(() => {
    if (!_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading]);

  return (
    <>
      {userIsPremium ? (
        <div className="">
          <div className="justify-center flex rounded-full">
            <Image
              src={user.photoUrl}
              className="rounded-full"
              alt="Picture of the author"
              width={100}
              height={100}
            />
          </div>
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
        </div>
      ) : (
        <div className="animate__animated animate__fadeIn animate__delay-2s flex justify-center flex-col items-center mt-40 text-center p-10">
          <h1 className="text-2xl font-semibold">
            Todavía no tienes acceso a esta página
          </h1>
          <Link href="/">
            <a className=" underline">Regresar al menú de pagos</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default UserProfile;
