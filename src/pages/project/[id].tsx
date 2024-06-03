import GoToBack from "@/Components/GoToBack";
import PageTitle from "@/Components/PageTitle";
import Head from "next/head";
import React from "react";
import { API } from "@/services/api";
import ProjectDetails from "@/Features/Projects/components/ProjectDetails";
import { ProjectsData } from "@/Features/Projects/types";

interface Props {
  projectsDetail: ProjectsData;
}
export default function ProjectDetail({ projectsDetail }: Props) {
  return (
    <div className="container">
      <Head>
        <title>Details</title>
      </Head>
      <div className="container_top_padding"></div>
      <GoToBack
        pathArr={[{ title: "project", path: "/project" }, { title: "details" }]}
      />
      <PageTitle title="project" />
      <ProjectDetails projectsDetail={projectsDetail} />
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const projectDetailResponse = await API.getOneProjectsDetail(
    context.params.id
  )
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });

  return {
    props: {
      projectsDetail: projectDetailResponse?.data || [],
    },
  };
};
