import React, { useEffect } from "react";
import UserProfile from "../../components/UserProfile";
import { getUserDetails } from "../../firebase/utils";
import { useRouter } from "next/router";

export async function getServerSideProps({ query }) {
  const uid = query["user"];

  let user = (await getUserDetails(uid)) || null;

  let quiniela = null;

  return {
    props: {
      user,
      quiniela,
    },
  };
}

const UserDetails = ({ user, quiniela }) => {
  const router = useRouter();
  useEffect(() => {
    if (user === null) {
      router.push("/404");
    }
  }, [user, router]);

  return <div>{user && <UserProfile user={user} />}</div>;
};

export default UserDetails;
