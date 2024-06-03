import GoToBack from "@/Components/GoToBack";
import PageTitle from "@/Components/PageTitle";
import Head from "next/head";
import React from "react";
import { API } from "@/services/api";
import { NewsData } from "@/Features/News/types";
import NewDetails from "@/Features/News/components/NewDetails";

interface Props {
  newsDetail: NewsData;
}
export default function InfoDetail({ newsDetail }: Props) {
  return (
    <div className="container">
      <Head>
        <title>Details</title>
      </Head>
      <div className="container_top_padding"></div>
      <GoToBack
        pathArr={[{ title: "info", path: "/info" }, { title: "details" }]}
      />
      <PageTitle title="news" />
      <NewDetails newsDetail={newsDetail} />
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const newDetailResponse = await API.getOneNewsDetail(context.params.id)
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });

  return {
    props: {
      newsDetail: newDetailResponse?.data || [],
    },
  };
};
