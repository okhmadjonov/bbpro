import AdminTableList from "@/Components/AdminTableList";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button, Table } from "@/ui";
import DeleteModal from "@/ui/DeleteModal";
import Pagination from "@/ui/Pagination/Pagination";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Link from "next/link";

const ProductsPage = () => {
  const t = useTranslations("ADMIN");
  const locale = useLocale();
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: t("Title"),
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
        <div className="table_action_btn">
          <Link href={`/admin/products/images/${record?.id}`}>
            <Button label="Images" size="small" />
          </Link>
          <Link href={`/admin/products/specifications/${record?.id}`}>
            <Button label="Specifications" size="small" />
          </Link>
        </div>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const router = useRouter();
  const handleOpenCreateModal = () => {
    router.push("/admin/products/create");
  };

  const {
    data: newsApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/Product",
      method: "GET",
    },
  });

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `/Product/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        refetchGetApi();
      },
    });

  return (
    <div className="product_list">
      <div className="admin_page_title">
        <h1>Products page</h1>
        <div className="btn_group">
          <Button
            onClick={handleOpenCreateModal}
            size="middle"
            label="Create"
          />
          <Link href={"/admin/products/specifications"}>
            <Button label={t("Specifications")} />
          </Link>
        </div>
      </div>
      <AdminTableList
        columns={columns}
        dataSource={newsApiResponse.data}
        handleSubmitDelete={handleSubmitDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isLoading={isLoading || deleteIsLoading}
      />
    </div>
  );
};

export default ProductsPage;
