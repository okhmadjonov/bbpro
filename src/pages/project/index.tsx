import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { ProjectsListResponseInterface } from "@/Components/Types";
import { API, axiosHeadersSetToken } from "@/services/api";
import dynamic from "next/dynamic";
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
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "project", path: "locations" }]} />
        <PageTitle />
        <ProjectList projectlist={projectlist} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);
    const projectsListResponse = await API.getProjectsList();

    return {
      props: {
        projectlist: projectsListResponse.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching projects list:", error);
    return { props: { projectlist: [] } };
  }
};
