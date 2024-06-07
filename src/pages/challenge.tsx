import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import dynamic from "next/dynamic";
import React from "react";

const ChallengeList = dynamic(
  () => import("@/Features/Challenge/components/ChallangeList"),
  {
    loading: () => <Loader />,
  }
);

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

export default function Challenge() {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "challenge", path: "challenge" }]} />
        <PageTitle />
        <ChallengeList />
      </div>
    </div>
  );
}
