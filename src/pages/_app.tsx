// src/pages/_app.tsx
import "@/styles/globals.css";
import "@/styles/antdStyle.scss";
import type { AppProps } from "next/app";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "@/Components/Layout";
import Head from "next/head";
import Loader from "@/Components/Loader/Loader";
import { SessionProvider } from "next-auth/react";
import { BigBoxPro } from "@/Assets/Images";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && <Loader isComponent={false} />}
      <SessionProvider>
        <IntlWrapperProvider>
          <MainLayout>
            <Head>
              <meta
                property="og:title"
                content="Big Box Pro - IT Services & Security"
              />
              <meta
                property="og:description"
                content="Производство ИТ-услуг и обеспечение высокого уровня безопасности. Наша главная цель — обеспечить безопасность и стабильную скорость."
              />
              <link rel="BigBoxPro" href="/bigboxpro.png" />

              <meta property="og:type" content="website" />
            </Head>

            <Component {...pageProps} />
          </MainLayout>
        </IntlWrapperProvider>
      </SessionProvider>
    </>
  );
}
