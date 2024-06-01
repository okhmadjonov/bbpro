import dynamic from "next/dynamic";
import Head from "next/head";
import Loader from "@/Components/Loader/Loader";
import { HomeBannerInterface } from "@/Components/Types";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";

const HomeHeader = dynamic(
  () => import("@/Features/home/components/HomeHeader"),
  {
    loading: () => <Loader isComponent={false} />,
  }
);

const CyberThread = dynamic(
  () => import("@/Features/home/components/CyberThread"),
  {
    loading: () => <Loader isComponent={false} />,
  }
);

const Partners = dynamic(() => import("@/Features/home/components/Partners"), {
  loading: () => <Loader isComponent={false} />,
});

const Banner = dynamic(() => import("@/Components/Banner/Banner"), {
  loading: () => <Loader isComponent={false} />,
});

interface HomeProps {
  homeBanner: HomeBannerInterface[];

  messages: any;
}

const Home = ({ homeBanner, messages }: HomeProps) => (
  <IntlWrapperProvider>
    <Head>
      <title>b-b-pro</title>
    </Head>
    <Banner>
      <HomeHeader homeBanner={homeBanner} />
    </Banner>
    <CyberThread />
    <Partners />
  </IntlWrapperProvider>
);

export default Home;
