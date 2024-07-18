import React, { useEffect, useState } from "react";
import ServicesCard from "../ServicesCard/index";
import styles from "./ServicesList.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import {
  LocaleStringsInterface,
  ServiceListInterface,
  ServiceCategoryDataInterface,
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
  const [currentCategoryId, setCurrentCategoryId] =
    useState<number>(initialDataId);
  const [categoryData, setCategoryData] =
    useState<ServiceCategoryDataInterface>({
      items: [],
      totalItems: 0,
      itemsPerPage: 6,
      currentItemCount: 0,
      pageIndex: 1,
      totalPages: 0,
    });

  const [currentPage, setCurrentPage] = useState<number>(
    categoryData.pageIndex
  );

  useEffect(() => {
    const storedCategoryId = localStorage.getItem("currentCategoryId");
    if (storedCategoryId) {
      setCurrentCategoryId(Number(storedCategoryId));
    }
  }, []);

  useEffect(() => {
    if (currentCategoryId) {
      appendData({
        pageIndex: currentPage,
        pageSize: 6,
        id: currentCategoryId,
      });
    }
  }, [currentPage, currentCategoryId]);

  useEffect(() => {
    if (categoryData.pageIndex !== currentPage) {
      setCurrentPage(categoryData.pageIndex);
    }
  }, [categoryData]);

  const handlePageChange = (page: number, pageSize: number) => {
    appendData({ PageSize: pageSize, PageIndex: page });
    setCurrentPage(page);
  };

  const onChange = (key: number) => {
    setCurrentPage(1);
    setCurrentCategoryId(key);
    localStorage.setItem("currentCategoryId", key.toString());
    appendData({ pageIndex: 1, pageSize: 6, id: key });
  };

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
        pageSize={6}
        total={categoryData.totalItems}
        onChange={handlePageChange}
        prevIcon={prevIcon.src}
        nextIcon={nextIcon.src}
      />
    </div>
  );
};

export default ServicesList;
