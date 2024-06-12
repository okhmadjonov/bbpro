import dynamic from "next/dynamic";
import Head from "next/head";
import Loader from "@/Components/Loader/Loader";
import { AboutInterface, HomeBannerInterface } from "@/Components/Types";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";
import { BrandsInterface } from "@/Features/home/components/types";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";
import About from "./about";

const HomeHeader = dynamic(
  () => import("@/Features/home/components/HomeHeader"),
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

const Advantages = dynamic(
  () => import("../Features/home/components/Advantages/"),
  {
    loading: () => <Loader />,
  }
);

const AboutCompany = dynamic(
  () => import("../Features/home/components/AboutCompany/"),
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
  const t = useTranslations();

  return (
    <IntlWrapperProvider>
      <Head>
        <title>bbpro.me</title>
      </Head>
      <Banner>
        <HomeHeader homeBanner={homeBanner} />
      </Banner>
      <Advantages />
   
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
