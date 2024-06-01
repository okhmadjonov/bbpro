import AdminTableList from "@/Components/AdminTableList";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button } from "@/ui";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { smoothScroll } from "@/utils/smoothScroll";
import Link from "next/link";

const NewsPage = () => {
  const t = useTranslations('ADMIN')
  const locale = useLocale();
  const router = useRouter();
  const [query, setQuery] = useState({ PageSize: 10, PageIndex: 1 });
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: t('Title'),
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <div>{record.title[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      render: (text: string, record: any) => (
        <div>{record.description[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
    {
      title: "",
      dataIndex: "subcontent",
      key: "subcontent",
      render: (text: string, record: any) => (
        <Link href={`/admin/news/subcontent/${record?.id}`}>
          <Button label="Sub Content" size="small" />
        </Link>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const handleOpenCreateModal = () => {
    router.push("/admin/news/create");
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setQuery({ PageSize: pageSize, PageIndex: page });
  };

  const {
    data: newsApiResponse,
    isLoading,
    appendData,
  } = useQueryApiClient({
    request: {
      url: "/News",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess() {
      smoothScroll("top", 0);
    },
  });

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/News/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        appendData(query);
      },
    });

  useEffect(() => {
    appendData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("NewsPage")}</h1>
        <Button onClick={handleOpenCreateModal} size="middle" label={t("Create")} />
      </div>
      <AdminTableList
        columns={columns}
        dataSource={newsApiResponse?.data}
        handleSubmitDelete={handleSubmitDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isLoading={isLoading || deleteIsLoading}
        handlePageChange={handlePageChange}
        paginationVisible={true}
      />
    </div>
  );
};

export default NewsPage;
