import AdminTableList from "@/Components/AdminTableList";
import {
  LocaleStringsInterface,
  SelectedDataInterface,
} from "@/Components/Types";
import { Button, Table } from "@/ui";
import DeleteModal from "@/ui/DeleteModal";
import Pagination from "@/ui/Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import SpecificationsModal from "../../ActionModals/SpecificationsModal";
import styles from "../ProductPage.module.scss";
import { ProductDataInterface } from "@/Features/admin/types";

interface Props {
  refetchGetApi: () => void;
  isLoading?: boolean;
  productData: ProductDataInterface;
}

const Specification = ({ refetchGetApi, isLoading, productData }: Props) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [filteredTechCharacter, setFilteredTechCharacter] = useState([]);
  const [selectedTechCharacter, setSelectedTechCharacter] = useState([]);
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "key",
      key: "key",
      render: (text: string, record: any) => (
        <div>{record?.key?.[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
    {
      title: "Value",
      dataIndex: "text",
      key: "text",
      render: (text: string, record: any) => (
        <div>{record?.value?.[locale as keyof LocaleStringsInterface]}</div>
      ),
    },
  ];

  const handleSubmitDelete = () => {
    deleteRefetch();
  };

  const { refetch: deleteRefetch, isLoading: deleteIsLoading } =
    useQueryApiClient({
      request: {
        url: `TechCharacterValue/${selectedData?.data?.id}`,
        method: "DELETE",
      },
      onSuccess() {
        setSelectedData({ type: "default", data: {} });
        refetchGetApi();
      },
    });

  const { data: techCharacterData } = useQueryApiClient({
    request: {
      url: `TechCharacter/`,
      method: "GET",
    },
  });

  const handleOpenUpdateModal = (data: any) => {
    setSelectedData({
      method: "PUT",
      type: "edit",
      data: data,
    });
    handleFilterData(data.techCharacterId);
  };
  const handleOpenCreateModal = () => {
    setSelectedData({ method: "POST", type: "create", data: {} });
    handleFilterData();
  };

  const handleFilterData = (id?: number) => {
    if (
      techCharacterData &&
      productData &&
      productData.techCharacterValueModels
    ) {
      const productTechChars = productData.techCharacterValueModels.map(
        (item: any) => item.techCharacterId
      );
      const filteredData = techCharacterData.data.filter(
        (item: any) => !productTechChars.includes(item.id)
      );
      if (id) {
        const oneData = techCharacterData.data.filter(
          (item: any) => item.id === id
        );
        const newData = filteredData.concat(oneData);
        setFilteredTechCharacter(newData);
        return;
      }
      setFilteredTechCharacter(filteredData);
    }
  };

  useEffect(() => {
    setFilteredTechCharacter(techCharacterData.data);
  }, [techCharacterData]);

  return (
    <div className={styles.specifications_side}>
      <div className="admin_page_title">
        <h1>Product Specifications</h1>
        <div className="btn_group">
          <Button
            onClick={handleOpenCreateModal}
            size="middle"
            label="Create"
          />
        </div>
      </div>
      <AdminTableList
        columns={columns}
        dataSource={productData?.techCharacterValueModels}
        handleSubmitDelete={handleSubmitDelete}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        isLoading={isLoading || deleteIsLoading}
        isPageCrud={false}
        openEditModal={handleOpenUpdateModal}
      />
      <SpecificationsModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        refetch={refetchGetApi}
        techCharacterData={filteredTechCharacter}
        selectedTechCharacter={selectedTechCharacter}
      />
    </div>
  );
};

export default Specification;
