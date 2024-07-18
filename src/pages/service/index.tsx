import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { API, axiosHeadersSetToken } from "@/services/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect } from "react";

const ServiceList = dynamic(
  () => import("@/Features/Service/components/ServicesList"),
  {
    loading: () => <Loader />,
  }
);

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface Props {
  catalogCategory: any;
}

export default function Service({ catalogCategory }: Props) {
  return (
    <div>
      <Head>
        <title>Services</title>
      </Head>

      <div className="container">
        <div className="container_top_padding">
          <GoToBack pathArr={[{ title: "service", path: "service" }]} />
          <PageTitle />
          <ServiceList
            catalogCategory={catalogCategory}
            initialDataId={catalogCategory?.[0]?.id}
          />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);

    const servicesListResponse = await API.getSolutionsList();

    const catalogCategoryResponse = await API.getCatalogCategory()
      .then((res: any) => {
        return res.data;
      })

      .catch((error: any) => {
        return { data: [] };
      });

    return {
      props: {
        servicelist: servicesListResponse.data || [],
        catalogCategory: catalogCategoryResponse.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        servicelist: [],
        catalogCategory: [],
      },
    };
  }
};
