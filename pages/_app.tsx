import ButtonScrollTop from "components/ButtonScrollTop";
import Footer from "components/Footer";
import Header from "components/Header";
import SEO from "components/SEO";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import * as gtag from "libs/gtag";
import "scss/index.scss";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Fragment>
      {process.env.NEXT_PUBLIC_GA && (
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
      )}
      <SEO />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ButtonScrollTop />
    </Fragment>
  );
}

export default appWithTranslation(App);
