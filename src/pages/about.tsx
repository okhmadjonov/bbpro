import React from "react";

const AboutPage = dynamic(() => import("@/Features/About/"), {
  loading: () => <Loader />,
});
const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});
import { API } from "@/services/api";
import { AboutInterface } from "@/Components/Types";
import dynamic from "next/dynamic";
import Loader from "@/Components/Loader/Loader";
import GoToBack from "@/Components/GoToBack";

interface AboutProps {
  about: AboutInterface[];
}

export default function About({ about }: AboutProps) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "about", path: "locations" }]} />
        <PageTitle />
        <AboutPage about={about} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const aboutResponse = await API.getAbout()
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });
  return {
    props: {
      about: aboutResponse.data || [],
    },
  };
};
