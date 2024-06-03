import React, { useState } from "react";
import ServicesCard from "../ServicesCard/index";
import styles from "./ServicesList.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import { ServicesListResponseInterface } from "@/Components/Types";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { smoothScroll } from "@/utils/smoothScroll";

interface ServiceListProps {
  servicelist: ServicesListResponseInterface;
}

const ServicesList = ({ servicelist }: ServiceListProps) => {
  const t = useTranslations("");
  const locale: string = useLocale();
  const [servicesDataState, setServicesDataState] =
    useState<ServicesListResponseInterface>(servicelist);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, pageSize: number) => {
    appendData({ PageSize: pageSize, PageIndex: page });
    setCurrentPage(page);
  };

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: "/Solution",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setServicesDataState(res.data);
      smoothScroll("top", 0);
    },
  });

  return (
    <div className={styles.serviceslist}>
      <div className={styles.serviceslist__about}>
        {servicesDataState?.data?.map((data, index) => (
          <ServicesCard key={index} index={index} data={data} locale={locale} />
        ))}
      </div>
      <div>
        <Pagination
          total={servicesDataState.totalItems}
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

export default ServicesList;
