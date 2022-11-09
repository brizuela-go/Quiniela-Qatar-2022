import "../styles/globals.css";
import Layout from "../components/Layout";
import { PremiumContext } from "../context/PremiumContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
