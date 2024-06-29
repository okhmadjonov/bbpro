import React, { useState } from "react";
import styles from "./ProjectsList.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import { ProjectsListResponseInterface } from "@/Components/Types";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { smoothScroll } from "@/utils/smoothScroll";
import ProjectsCard from "../ProjectsCard/index";

interface ProjectListProps {
  projectlist: ProjectsListResponseInterface;
}

const ProjectList = ({ projectlist }: ProjectListProps) => {
  const t = useTranslations("");
  const locale: string = useLocale();
  const [projectsDataState, setProjectsDataState] =
    useState<ProjectsListResponseInterface>(projectlist);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, pageSize: number) => {
    appendData({ PageSize: pageSize, PageIndex: page });
    setCurrentPage(page);
  };

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: "/Project",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setProjectsDataState(res.data);
      smoothScroll("top", 0);
    },
  });

  return (
    <div className={styles.projectslist}>
      <div className={styles.projects_list__cards}>
        {projectsDataState?.data?.map((data, index) => (
          <ProjectsCard key={index} index={index} data={data} locale={locale} />
        ))}
      </div>
      <div>
        <Pagination
         className="pagination_product_list"
          total={projectsDataState.totalItems}
          pageSize={12}
          current={currentPage}
          onChange={handlePageChange}
          prevIcon={prevIcon.src}
          nextIcon={nextIcon.src}
        />
      </div>
    </div>
  );
};

export default ProjectList;
