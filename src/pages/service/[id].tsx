import GoToBack from "@/Components/GoToBack";
import PageTitle from "@/Components/PageTitle";
import Head from "next/head";
import React from "react";
import { API } from "@/services/api";
import ServiceDetails from "@/Features/Service/components/ServiceDetails";
import { ServicesData } from "@/Features/Service/types";

interface Props {
  servicessDetail: ServicesData;
}
export default function ServiceDetail({ servicessDetail }: Props) {
  return (
    <div className="container">
      <Head>
        <title>Details</title>
      </Head>
      <div className="container_top_padding"></div>
      <GoToBack
        pathArr={[{ title: "service", path: "/service" }, { title: "details" }]}
      />
      <PageTitle title="service" />
      <ServiceDetails servicesDetail={servicessDetail} />
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const serviceDetailResponse = await API.getOneServicesDetail(
    context.params.id
  )
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });

  return {
    props: {
      servicesDetail: serviceDetailResponse?.data || [],
    },
  };
};
