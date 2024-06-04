import dynamic from "next/dynamic";
import Head from "next/head";
import Loader from "@/Components/Loader/Loader";
import { HomeBannerInterface } from "@/Components/Types";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";
import { BrandsInterface } from "@/Features/home/components/types";
import Brands from "../Features/home/components/Brends/Index";
import { API } from "@/services/api";

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

const Banner = dynamic(() => import("@/Components/Banner/Banner"), {
  loading: () => <Loader isComponent={false} />,
});

const Brends = dynamic(
  () => import("../Features/home/components/Brends/Index"),
  {
    loading: () => <Loader />,
  }
);
interface HomeProps {
  homeBanner: HomeBannerInterface[];
  brands: BrandsInterface[];
  messages: any;
}

export default function Home({ homeBanner, brands, messages }: HomeProps) {
  return (
    <IntlWrapperProvider>
      <Head>
        <title>b-b-pro</title>
      </Head>
      <Banner>
        <HomeHeader homeBanner={homeBanner} />
      </Banner>
      <CyberThread />
      <Brends brands={brands} />
    </IntlWrapperProvider>
  );
}

export const getServerSideProps = async () => {
  const brands = await API.getBrands()
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });

  return {
    props: {
      brands: brands.data || [],
    },
  };
};
