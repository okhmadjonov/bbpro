import GoToBack from "@/Components/GoToBack";
import Head from "next/head";

import Loader from "@/Components/Loader/Loader";
import { ProjectInterface } from "@/Components/Types";
import { API } from "@/services/api";
import dynamic from "next/dynamic";
import React from "react";

const ProjectPage = dynamic(() => import("@/Features/Projects"), {
  loading: () => <Loader />,
});

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface ProjectProps {
  projects: ProjectInterface[];
}

const Project = ({ projects }: ProjectProps) => {
  return (
    <div className="container">
      <Head>
        <title>Projects</title>
      </Head>
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "project", path: "locations" }]} />
        <PageTitle />
        <ProjectPage projects={projects} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const projectResponse = await API.getProjectsList()
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });
  return {
    props: {
      projects: projectResponse.data || [],
    },
  };
};

export default Project;
