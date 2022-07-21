import Footer from "components/Footer";
import Header from "components/Header";
import SEO from "components/SEO";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { Fragment } from "react";
import 'scss/index.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <SEO />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Fragment>
  );
}

export default appWithTranslation(App);
