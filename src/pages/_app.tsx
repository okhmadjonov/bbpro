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
              <meta name="description" content="Новое описание вашего сайта" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </Head>

            <Component {...pageProps} />
          </MainLayout>
        </IntlWrapperProvider>
      </SessionProvider>
    </>
  );
}
