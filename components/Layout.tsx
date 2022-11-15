import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import firebase from "../firebase/firebaseClient";
import { useStateContext } from "../context/PremiumContext";
import Script from "next/script";

const Layout = ({ children }) => {
  const [userPhoto, setUserPhoto] = React.useState("");
  const { _user, userLoading, userIsPremium } = useStateContext();

  const router = useRouter();

  firebase
    .firestore()
    .collection("users")
    .doc(_user?.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        setUserPhoto(doc.data().photoUrl);
      } else {
        // doc.data() will be undefined in this case
      }
    })
    .catch((error) => {});

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://widgets.sportmonks.com/js/world-cup/livescore.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const script2 = document.createElement("script");

    script2.src =
      "https://widgets.sportmonks.com/js/world-cup/standingsSlider.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script2);
  }, []);

  return (
    <body>
      <Head>
        <title>La Quiniela de Arturo Qatar 2022</title>
        <link rel="icon" href="/logo.png" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://widgets.sportmonks.com/css/app.css"
        />
        <meta
          name="description"
          content="La Quiniela de Arturo de la Copa Mundial de la FIFA 2022"
        />
      </Head>

      <header>
        {_user && !userLoading && userIsPremium && (
          <Navbar _user={_user} userPhoto={userPhoto} />
        )}
      </header>
      <main>{children}</main>

      <div className={router.pathname !== "/" && "hidden"}>
        <div className=" m-8 mt-28">
          <div
            className=" mb-16 mt-8"
            id="sportmonks-widget"
            data-widget="wc-standings-slider"
            data-info="jXcPxsVvMX9CoSPHSAidnOc3VioT377oUCO7OSHMR3joUA5AECaxUo2cptFP1pPebxJouujerNRV/jGGPbxgwxxIKz6/tUU49Sy3dq/gzrFzhQOePyF5T/tWceY0OqLS4+zRC41ydqeY9ij+/DOEnSv4zmqB/nT9Vls59/uNtMrfOwFt/y35hJ0Mw0MMHkWW5Csvw6mc8zvKrykqD5XzMp+RWAgQymJmq2DDwtYdRIt5ZJgc5PEsUhu2gqz8hCO9G/uDgIn/blCtufyFqktIdcHekeaTY8dAD1Px0heYKZtgbVQDF1sLKS7KhFvjKWeb50B3uy6viFeb1a/KRPqWTOFgHLGOuxyn615fGjybtKqYRJ0/z1abgOM4hSEMM+loto0skRyOai1ctsU01GHG7NosmDgi9TwKcFYaWl7lfw44V69lcqvLB7DY4TjVF0LSIVfaQCbv0fx6Uui1Xqu0d5LiOPuLuVh5qwcQxXbOhqJsdut8kibJuiWKfcmuVQTMBdL4yNB80uF3QuBQWMQiWlrWZor/E0M5/lDHQC3kPVk30TVAiHzo+eR5wtEMcMofcHSNR5QxoksssKjEc7NmwAwneoCpwSrR5hfm2ktxjY4CYpYg3LR+nXmgB4Y/zXb6H93W+HlEYrQ8QwsaLZHtjdnp7Se5H/LNneSkrprkLeY="
            data-colors="#3C041D,#1893C1,#D0D0D9,#7F1431"
            data-font="Roboto"
          ></div>
          <div
            id="sportmonks-widget"
            data-widget="wc-livescore"
            data-info="C645gd8gEttIIRoTxzC/e3wZZBi9BPLttxTRDPbtAzlJ8yyROKH+KqbBSsKmiT+5JQtsKlLQ35hBcHD4woT1+cFv4stlA7ahCD2FA8FiSxl4bKB0J+QjifPDtFmmUBVSASgtBhpdNLtm4iHsx0YFvxdks5gjpvQILwQyvd4S9+41YICfhnBUAKudLJRJOHtzShZ4GeSyRZwooWUWos/eAvuWrlAik0xTKKx9TlTaM+ZPI90SbiJilp9MwqKvvl4bM37RE+fTI+p656CSHT8DObVmKYUXk2CRh8QiR+vRSNKYwqCIKwi19T6iExEqLgf4cPKYwS+8nQ7TaAdCoYteB9wMgJMtRZi8TzoFOm9UFbP/ThvmLFUaIsqEFya8Ktho9eHreUL+tR2x5QdTMWCYvEZW9gG41KDzQy1AAUxbtti8q+RIsJZCRveYkRNyQeU05g5oTJ8gjE7xBMicbvb5p8jgePFu+DgIE2Xkl9nggNi00QyOuyaexLY3DiiZs4VDiXeT2Kza7FdCxax0x+eAeGhzzoCxLNDYhz9FfTC8NWnXkDsIeK4Zw8Z1BNWL++g7OLZvRieUPS57dVgkkgUG4A2gulVlGfi0Wjp7xs8SSuBEtVTcLnIVZd+VhJAbasxgCCVhvhXsiwYNz19jYaL1HUfV6sBAWOef2EuL9YYWz+o="
            data-tz="America/Mexico_City"
            data-font="Roboto"
          ></div>
        </div>
      </div>

      <footer>{_user && !userLoading && userIsPremium && <Footer />}</footer>
      <script
        type="text/javascript"
        src="https://widgets.sportmonks.com/js/world-cup/livescore.js"
      ></script>
      <script
        type="text/javascript"
        src="https://widgets.sportmonks.com/js/world-cup/standingsSlider.js"
      ></script>
    </body>
  );
};

export default Layout;
