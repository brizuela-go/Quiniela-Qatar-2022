import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../firebase/firebaseClient";
import { useStateContext } from "../context/PremiumContext";

const Layout = ({ children }) => {
  const [_user, userLoading] = useAuthState(firebase.auth());
  const [userPhoto, setUserPhoto] = React.useState("");
  const { userIsPremium } = useStateContext();

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
        <title>La Quiniela Qatar 2022</title>
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
      </Head>

      <header>
        {_user && !userLoading && userIsPremium && (
          <Navbar _user={_user} userPhoto={userPhoto} />
        )}
      </header>
      <main>{children}</main>

      <div className={router.pathname !== "/" && "hidden"}>
        <div className=" m-8">
          <div
            className=" mb-16 mt-8"
            id="sportmonks-widget"
            data-widget="wc-standings-slider"
            data-info="wIsuVd4XIeurKHuU7nmbhjlvNVgGu/2Pv/gpM+T5dRstskWv+BkMs6a4QiqutW6s5uZKhmYUuPXDKcRn53xA4gr50GKIoXI5AdL8neIUe9RqadPxH5gCRZT4AkPOrU2MD+ggRJ/ekFv/gP9WLhLRmsyWwWdpBsbPPTbfQki3PG98BFNb3tzS097YlOZ1YJC++oyCbMOYYQYDHkO3Mwf2qtmxJTALHWOtDzAunrlfXSJJwROd7VwDtdZMKzgKvyczM8oaPzilqVi8mqsiejXfLeagmAHNGVrcbiHGXptyx2IBMCklt5NH5jyE39krg2V4IAAi+8UZNMN7+n/b2UxYu48tSdjchjkqQ+2fnoENPqJV5qV2A1S2wlRzg+H0jzrpbeAwT3xNLd3a3EHcdPK+29VzIMGWzPZ1aTKjjZjtMwGL0UGDntiK3AXRLqlX0HlBtVXWNqP+n+R9g5Tq6pmIrs6jYpDmQyyoP8efU2oVSxn4pE2WuwoE4GoGnxGhWPau+6Ply7xZh/ykl/lnpdM3rjdfpwHvmC+ejhvxd1Q3GS6MMUR809NI9BWhpilHNl1VlHRae7Wx6/Pxn7672ECftKUoGcznMszlRM3+bwoQa928edNBw2Hku/xMsvgQ/LBDNL1WAIAaMsOTzpqZkz39+uleI06rHTDy+3vv55i8wFE="
            data-colors="#3C041D,#1893C1,#D0D0D9,#7F1431"
            data-font="Roboto"
          ></div>
          <div
            id="sportmonks-widget"
            data-widget="wc-livescore"
            data-info="hhZLFib/vWXZnXZuaTmd3hRvd5RoVpr0YoAsbZfuD+N26DGX1JqiNkrQcr1/LWOgBQISZqNisXBBZRRlRQGMkPbEyquLPq3RTR54XVNLO6K5gcbF07GK9Zm0F7Ami1OT9yPXPe4LyBbiUHSNDp+oB5KtLIHT888zMT3MktmxbUBPq5RhLJE1mLBgERzLyzGhNZXxokEukcOgRo8KUOW3BffLxmK/B+OuMh60dlrLcMUJtIvALN7NFvdTDVdGVIx9DfkCBvaRxDeLvSEORBH6yX+J41vD3ot+oLRNtwDXVkHpCXsPN8HFkxUCw17P9ttgpKJndMCeQfWFMFE6Oqm3GiDg1GWzyTzp0sBKaaSrnWlPISe1rEbWy8F5lbBIln0htlLyssfslwdMEXgkAHmAhTlDgro/7RT3hIF91TLhxUKnvXjVb61yjZfFxGExySsyGhpMyg5sTDpN8UkRuUd4Ml8bvtDELISLC/nCTbbyk3MQUDlVvMQNwAa8vMRX3RJw0aORX/XYbc/xVrFojEzra36NPNkS2CFxTqUV2MIHJ+34wsc158GJ8P3r8u+REgCcAr2tJpIUNW9RERQiAsh78ECK8g7nZQJJ4BH3QInkSXgd5Dp18uMRIATR0Lic898ejY0Q/dy79iCYsyVl3k1rv9LSt4STULwqdZ2l//swfUs="
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
