import Head from "next/head";

export default function Scripts() {
  return (
    <Head>
      <link
        rel="stylesheet"
        href="https://widgets.sportmonks.com/css/app.css"
      ></link>
      <script
        type="text/javascript"
        src="https://widgets.sportmonks.com/js/world-cup/livescore.js"
      ></script>
      <script
        type="text/javascript"
        src="https://widgets.sportmonks.com/js/world-cup/standingsSlider.js"
      ></script>
    </Head>
  );
}
