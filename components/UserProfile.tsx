import React, { useEffect } from "react";
import Image from "next/image";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type Props = {};

const UserProfile = ({ user }) => {
  const [_user, userLoading] = useAuthState(firebase.auth());

  const router = useRouter();

  useEffect(() => {
    if (!_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading]);

  return (
    <>
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
    </>
  );
};

export default UserProfile;
