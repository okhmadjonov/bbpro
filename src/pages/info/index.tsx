import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { NewsListResponseInterface } from "@/Components/Types";
import { API, axiosHeadersSetToken } from "@/services/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const NewList = dynamic(() => import("@/Features/News/components/NewsList"), {
  loading: () => <Loader />,
});

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface Props {
  newlist: NewsListResponseInterface;
}

export default function Info({ newlist }: Props) {
  return (
    <div>
      <Head>
        <title>News</title>
      </Head>
      <div className="container">
        <div className="container_top_padding">
          <GoToBack pathArr={[{ title: "info", path: "info" }]} />
          <PageTitle />
          <NewList newlist={newlist} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);
    const newsListResponse = await API.getNewsList();

    return {
      props: {
        newlist: newsListResponse.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching news list:", error);
    return { props: { newlist: [] } };
  }
};
