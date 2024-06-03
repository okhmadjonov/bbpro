import React, { useState } from "react";
import NewsCard from "../NewsCard/index";
import styles from "./NewsList.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import {
  NewListInterface,
  NewsListResponseInterface,
} from "@/Components/Types";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { smoothScroll } from "@/utils/smoothScroll";

interface NewListProps {
  newlist: NewsListResponseInterface;
}

const NewList = ({ newlist }: NewListProps) => {
  const t = useTranslations("");
  const locale: string = useLocale();
  const [newsDataState, setNewsDataState] =
    useState<NewsListResponseInterface>(newlist);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number, pageSize: number) => {
    appendData({ PageSize: pageSize, PageIndex: page });
    setCurrentPage(page);
  };

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: "/News",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setNewsDataState(res.data);
      smoothScroll("top", 0);
    },
  });

  return (
    <div className={styles.newslist}>
      <div className={styles.newslist__about}>
        {newsDataState?.data?.map((data, index) => (
          <NewsCard key={index} index={index} data={data} locale={locale} />
        ))}
      </div>
      <div>
        <Pagination
          total={newsDataState.totalItems}
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

export default NewList;
