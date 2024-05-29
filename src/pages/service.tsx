import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { ServiceInterface } from "@/Components/Types";
import dynamic from "next/dynamic";
import React from "react";

const ServicePage = dynamic(() => import("@/Features/Service"), {
  loading: () => <Loader />,
});

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface ServiceProps {
  services: ServiceInterface[];
}

export default function Service({ services }: ServiceProps) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "service", path: "locations" }]} />
        <PageTitle />
        <ServicePage services={services} />
      </div>
    </div>
  );
}
