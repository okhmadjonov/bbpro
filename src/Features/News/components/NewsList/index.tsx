import React, { useState, useEffect } from "react";
import NewsCard from "../NewsCard/index";
import styles from "./NewsList.module.scss";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Pagination from "@/ui/Pagination/Pagination";
import { nextIcon, prevIcon } from "@/Assets/Images/index";
import {
  NewsListInterface,
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
  const [newsDataState, setNewsDataState] = useState<NewsListInterface>({
    items: [],
    totalItems: 0,
    itemsPerPage: 0,
    currentItemCount: 0,
    pageIndex: 0,
    totalPages: 0,
  });

  const [currentPage, setCurrentPage] = useState(newsDataState.pageIndex);

  useEffect(() => {
    setNewsDataState(newlist.data);
    setCurrentPage(newlist.data.pageIndex);
  }, [newlist]);

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
      <div className={styles.news_list__cards}>
        {newsDataState.items.map((data, index) => (
          <NewsCard key={index} index={index} data={data} locale={locale} />
        ))}
      </div>
      <div>
        <Pagination
          className="pagination__product_list"
          total={newsDataState.totalItems}
          pageSize={newsDataState.itemsPerPage}
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
