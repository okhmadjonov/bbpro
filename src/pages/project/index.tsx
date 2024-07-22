import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { ProjectsListResponseInterface } from "@/Components/Types";
import { API, axiosHeadersSetToken } from "@/services/api";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const ProjectList = dynamic(
  () => import("@/Features/Projects/components/ProjectsList"),
  {
    loading: () => <Loader />,
  }
);

const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface Props {
  projectlist: ProjectsListResponseInterface;
}

export default function Project({ projectlist }: Props) {
  return (
    <div>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="container">
        <div className="container_top_padding">
          <GoToBack pathArr={[{ title: "project", path: "project" }]} />
          <PageTitle />
          <ProjectList projectlist={projectlist} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);
    const projectsListResponse = await API.getProjectsList()
      .then((res: any) => res.data)
      .catch((error: any) => ({
        data: [],
        totalItems: 0,
        itemsPerPage: 0,
        currentItemCount: 0,
        pageIndex: 0,
        totalPages: 0,
      }));

    return {
      props: {
        projectlist: projectsListResponse || {
          data: [],
          totalItems: 0,
          itemsPerPage: 0,
          currentItemCount: 0,
          pageIndex: 0,
          totalPages: 0,
        },
      },
    };
  } catch (error) {
    return {
      props: {
        newlist: {
          data: [],
          totalItems: 0,
          itemsPerPage: 0,
          currentItemCount: 0,
          pageIndex: 0,
          totalPages: 0,
        },
      },
    };
  }
};
