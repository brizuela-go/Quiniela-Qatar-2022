import React from "react";
import Head from "next/head";
import { useEffect } from "react";

type Props = {};

const hello = (props: Props) => {
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
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://widgets.sportmonks.com/css/app.css"
        />
      </Head>
    </div>
  );
};

export default hello;
