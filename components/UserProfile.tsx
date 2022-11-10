import React, { useEffect } from "react";
import Image from "next/image";
import firebase from "../firebase/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useStateContext } from "../context/PremiumContext";

type Props = {};

const UserProfile = ({ user }) => {
  const [_user, userLoading] = useAuthState(firebase.auth());

  const { userIsPremium } = useStateContext();
  useEffect(() => {
    if (!userIsPremium) {
      router.push("/");
    }
  }, [userIsPremium]);

  const router = useRouter();

  useEffect(() => {
    if (!_user && !userLoading) {
      router.push("/");
    }
  }, [_user, userLoading, router]);

  return (
    <section className="pt-16 bg-blueGray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                <img
                  alt="..."
                  src={user?.photoUrl}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
              <div className="text-center mt-12 ">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 ">
                  {user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-lg "></i>
                  {user?.email}
                </div>
              </div>
              <div className="w-full px-4 text-center">
                <hr className="mt-3" />
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide ">
                      {user.puntos}
                    </span>
                    <span className="text-sm text-blueGray-400">Puntos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
