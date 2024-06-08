import React, { useEffect, useState } from "react";
import ServicesCard from "../ServicesCard/index";
import styles from "./ServicesList.module.scss";
import { Tabs } from "antd";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import {
  LocaleStringsInterface,
  ServiceListInterface,
  ServicesListResponseInterface,
} from "@/Components/Types";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { smoothScroll } from "@/utils/smoothScroll";

interface ServiceListProps {
  catalogCategory: any[];
  initialDataId: number;
}

const ServicesList = ({ catalogCategory, initialDataId }: ServiceListProps) => {
  const t = useTranslations("");
  const locale: string = useLocale();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCatrgoryId, setCurrentCatrgoryId] = useState(initialDataId);
  const [catrgoryData, setCatrgoryData] = useState({
    items: [],
    totalItems: 0,
  });

  const pagination = (page: number) => {
    setCurrentPage(page);
  };
  const onChange = (key: any) => {
    setCurrentPage(1);
    setCurrentCatrgoryId(key);
    appendData({ pageIndex: 1, pageSize: 12, id: key });
  };
  useEffect(() => {
    if (typeof currentCatrgoryId !== "number") return;
    appendData({ pageIndex: currentPage, pageSize: 12, id: currentCatrgoryId });
  }, [currentPage, currentCatrgoryId]);

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: "/Solution/solutions-by-categoryid",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setCatrgoryData(res.data);
      smoothScroll("top", 0);
    },
  });

  return (
    <div className={styles.products_list} data-aos="fade-up">
      <Tabs
        defaultActiveKey="Software"
        items={catalogCategory?.map((item) => ({
          key: item.id,
          label: item.title,
          children: (
            <div className={styles.products_list__cards}>
              {catrgoryData?.items?.map(
                (el: ServiceListInterface, index: number) => {
                  return (
                    <ServicesCard
                      id={el.id}
                      key={index}
                      index={index}
                      description={el.description}
                      title={el.title}
                      imageUrl={el.imageUrl}
                    />
                  );
                }
              )}
            </div>
          ),
        }))}
        onChange={onChange}
      />

      <Pagination
        className="pagination_product_list"
        current={currentPage}
        pageSize={12}
        total={catrgoryData?.totalItems}
        onChange={pagination}
        prevIcon={prevIcon.src}
        nextIcon={nextIcon.src}
      />
    </div>
  );
};

export default ServicesList;
