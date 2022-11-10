import "../styles/globals.css";
import Layout from "../components/Layout";
import { PremiumContext } from "../context/PremiumContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 500,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const theme = createTheme({
  typography: {
    fontFamily: "Inter var",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <PremiumContext>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PremiumContext>
  );
}

export default MyApp;
