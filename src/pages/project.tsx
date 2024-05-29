import GoToBack from "@/Components/GoToBack";
import Loader from "@/Components/Loader/Loader";
import { ProjectInterface } from "@/Components/Types";
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

export default function Service({ projects }: ProjectProps) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "project", path: "locations" }]} />
        <PageTitle />
        <ProjectPage projects={projects} />
      </div>
    </div>
  );
}
