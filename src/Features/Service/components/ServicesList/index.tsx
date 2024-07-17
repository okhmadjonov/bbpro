import React, { useEffect, useState } from "react";
import ServicesCard from "../ServicesCard/index";
import styles from "./ServicesList.module.scss";
import { Tabs, Card } from "antd";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import {
  LocaleStringsInterface,
  ServiceListInterface,
} from "@/Components/Types";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { smoothScroll } from "@/utils/smoothScroll";

interface ServiceListProps {
  catalogCategory: any[];
  initialDataId: number;
}

const ServicesList = ({ catalogCategory, initialDataId }: ServiceListProps) => {
  const t = useTranslations("");
  const locale = useLocale();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentCategoryId, setCurrentCategoryId] = useState(initialDataId);
  const [categoryData, setCategoryData] = useState({
    items: [],
    totalItems: 0,
  });

  useEffect(() => {
    // Log catalogCategory to the console
    console.log("Catalog Category in Service:", catalogCategory[0].title.Ru);
  }, [catalogCategory]);

  const pagination = (page: number) => {
    setCurrentPage(page);
  };

  const onChange = (key: any) => {
    setCurrentPage(1);
    setCurrentCategoryId(key);
    appendData({ pageIndex: 1, pageSize: 12, id: key });
  };

  useEffect(() => {
    if (typeof currentCategoryId !== "number") return;
    appendData({ pageIndex: currentPage, pageSize: 12, id: currentCategoryId });
  }, [currentPage, currentCategoryId]);

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: "/Solution/solutions-by-categoryid",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setCategoryData(res.data);
      smoothScroll("top", 0);
    },
  });

  return (
    <div className={styles.products_list} data-aos="fade-up">
      <div className={styles.labelCard}>
        {catalogCategory.map((item) => (
          <span
            key={item.id}
            className={`${styles.labelItem} ${
              currentCategoryId === item.id ? styles.active : ""
            }`}
            onClick={() => onChange(item.id)}
          >
            {item.title[locale as keyof LocaleStringsInterface]}
          </span>
        ))}
      </div>
      <div className={styles.products_list__cards}>
        {categoryData.items.map((el: ServiceListInterface, index: number) => (
          <ServicesCard
            id={el.id}
            key={index}
            index={index}
            description={el.description}
            title={el.title}
            imageUrl={el.imageUrl}
          />
        ))}
      </div>
      <Pagination
        className="pagination_product_list"
        current={currentPage}
        pageSize={12}
        total={categoryData.totalItems}
        onChange={pagination}
        prevIcon={prevIcon.src}
        nextIcon={nextIcon.src}
      />
    </div>
  );
};

export default ServicesList;
