import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { ServicesListResponseInterface } from "@/Components/Types";
import { API, axiosHeadersSetToken } from "@/services/api";
import dynamic from "next/dynamic";
import React from "react";

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
  servicelist: ServicesListResponseInterface;
}

export default function Service({ servicelist }: Props) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "service", path: "locations" }]} />
        <PageTitle />
        <ServiceList servicelist={servicelist} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);
    const servicesListResponse = await API.getServicesList();

    return {
      props: {
        servicelist: servicesListResponse.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching services list:", error);
    return { props: { servicelist: [] } };
  }
};
