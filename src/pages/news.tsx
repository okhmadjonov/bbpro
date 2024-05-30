import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { NewsInterface } from "@/Components/Types";
import dynamic from "next/dynamic";
import React from "react";

const NewsPage = dynamic(() => import("@/Features/News"), {
  loading: () => <Loader />,
});

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface NewsProps {
  news: NewsInterface[];
}

export default function Service({ news }: NewsProps) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "news", path: "locations" }]} />
        <PageTitle />
        <NewsPage newsdata={news} />
      </div>
    </div>
  );
}
