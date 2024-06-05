import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { NewsListResponseInterface } from "@/Components/Types";
import { API, axiosHeadersSetToken } from "@/services/api";
import dynamic from "next/dynamic";
import React from "react";

const ChallengeList = dynamic(() => import("@/Features/News/components/NewsList"), {
  loading: () => <Loader />,
});

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface Props {
  challengelist: NewsListResponseInterface;
}

export default function Info({ challengelist }: Props) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "challenge", path: "locations" }]} />
        <PageTitle />
        <ChallengeList newlist={challengelist} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);
    const challengesListResponse = await API.getNewsList();

    return {
      props: {
        challengelist: challengesListResponse.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching challenges list:", error);
    return { props: { challengelist: [] } };
  }
};
