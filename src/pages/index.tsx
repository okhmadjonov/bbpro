import dynamic from "next/dynamic";
import Head from "next/head";
import Loader from "@/Components/Loader/Loader";
import { HomeBannerInterface, WhyBBPInterface } from "@/Components/Types";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";

const HomeHeader = dynamic(
  () => import("@/Features/home/components/HomeHeader"),
  {
    loading: () => <Loader isComponent={false} />,
  }
);
const WhyBBP = dynamic(() => import("@/Features/home/components/WhyBBP"), {
  loading: () => <Loader isComponent={false} />,
});

const Banner = dynamic(() => import("@/Components/Banner/Banner"), {
  loading: () => <Loader isComponent={false} />,
});
const HomeDescription = dynamic(
  () => import("@/Components/Description/Description"),
  {
    loading: () => <Loader isComponent={false} />,
  }
);

interface HomeProps {
  homeBanner: HomeBannerInterface[];
  whyBBP: WhyBBPInterface;
  messages: any;
}

const Home = ({ homeBanner, messages, whyBBP }: HomeProps) => (
  <IntlWrapperProvider>
    <Head>
      <title>Big Box Pro</title>
    </Head>
    <Banner>
      <HomeHeader homeBanner={homeBanner} />
    </Banner>
    <HomeDescription>
      <WhyBBP whyBBP={whyBBP} />
    </HomeDescription>
  </IntlWrapperProvider>
);

export default Home;
