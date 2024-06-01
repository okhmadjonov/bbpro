import React, { useEffect, useState } from "react";
import { message, Space, Button } from "antd";
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { Upload, Button as CustomButton } from "@/ui"; // Import your custom upload component
import styles from "../ProductPage.module.scss";
import useQueryApiClient from "@/utils/useQueryApiClient";
import DeleteModal from "@/ui/DeleteModal/index";
import { SelectedDataInterface } from "@/Components/Types/index";
import ColorModal from "./ColorModal";
import { ColorInterface, ProductDataInterface } from "@/Features/admin/types";

interface ProductImagesProps {
  refetchGetApi: () => void;
  productData: ProductDataInterface;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  refetchGetApi,
  productData,
}) => {
  const t = useTranslations("ADMIN");
  const [colors, setColors] = useState<ColorInterface[]>([]);
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const handleChange = (
    file: any,
    colorId?: number,
    ImageId?: number
  ): void => {
    if (file) {
      const formData = new FormData();
      formData.append("ImagePath", file);
      formData.append("ColorId", String(colorId));
      if (ImageId) {
        updateImage(formData, { id: ImageId });
        return;
      }
      createImage(formData);
    }
  };

  const { refetch: deleteRefetch } = useQueryApiClient({
    request: {
      url: `/Colors/color-image?id=${selectedData?.data?.id}`,
      method: "DELETE",
      multipart: true,
    },
    onSuccess() {
      refetchGetApi();
      setSelectedData({ type: "default", data: {} });
    },
  });

  const { refetch: deleteColorRefetch } = useQueryApiClient({
    request: {
      url: `/Colors/${selectedData?.data?.id}`,
      method: "DELETE",
      multipart: true,
    },
    onSuccess() {
      refetchGetApi();
      setSelectedData({ type: "default", data: {} });
    },
  });

  const { appendData: createImage } = useQueryApiClient({
    request: {
      url: `/Colors/color-image`,
      method: "POST",
      multipart: true,
    },
    onSuccess(res) {
      refetchGetApi();
    },
  });

  const { appendData: updateImage } = useQueryApiClient({
    request: {
      url: `/Colors/color-image?id=:id`,
      method: "PUT",
      multipart: true,
    },
    onSuccess(res) {
      refetchGetApi();
    },
  });

  const handleRemoveColor = (colorIndex: number): void => {
    if (colors.length === 1) {
      message.error("At least one color must be present.");
      return;
    }
    const newColors = [...colors];
    newColors.splice(colorIndex, 1);
    setColors(newColors);
  };

  const handleOpenDeleteModal = (
    colorIndex?: number,
    imageIndex?: number,
    name?: string
  ): void => {
    const data = { id: imageIndex ? imageIndex : colorIndex };
    setSelectedData({ type: "delete", data, name });
    return;
  };

  const handleSubmitDelete = () => {
    if (selectedData.name === "image") {
      deleteRefetch();
      return;
    }
    if (selectedData.name === "color") {
      deleteColorRefetch();
    }
  };

  const handleOpenColorModal = (type: "edit" | "create", data?: any): void => {
    setSelectedData({
      type,
      name: "color",
      method: type === "edit" ? "PUT" : "POST",
      data,
    });
  };

  const handleAddImage = (colorIndex: number): void => {
    const newColors = [...colors];
    newColors[colorIndex]?.colorsModel?.images.push({
      imagesFromColorModel: { imagePath: "" },
    });
    setColors(newColors);
  };

  useEffect(() => {
    setColors(productData?.colors);
  }, [productData?.colors]);

  return (
    <div className={(styles.product_images, "product_images_list")}>
      <div className="admin_page_title">
        <h1>Product Images</h1>
        <div className="btn_group">
          <CustomButton
            onClick={() => handleOpenColorModal("create")}
            size="middle"
            label="Create Color"
          />
        </div>
      </div>
      {colors?.map(({ colorsModel }, colorIndex) => (
        <Space
          key={colorsModel.id}
          style={{
            display: "flex",
            marginBottom: 20,
            alignItems: "start",
            position: "relative",
          }}
          align="baseline"
        >
          <div
            style={{
              width: 150,
              height: 150,
              backgroundColor: colorsModel.key,
              marginRight: 16,
              position: "relative",
            }}
            className="color_box_admin"
          >
            <div className="color_hover_btn">
              <EditOutlined
                onClick={() => handleOpenColorModal("edit", colorsModel)}
              />
            </div>
          </div>
          {colors.length !== 0 && (
            <Button
              type="link"
              icon={<CloseOutlined />}
              danger
              onClick={() =>
                handleOpenDeleteModal(colorsModel.id, undefined, "color")
              }
              style={{ position: "absolute", top: -25, left: -25, zIndex: 100 }}
            />
          )}
          <Space style={{ flexWrap: "wrap" }} direction="horizontal">
            {colorsModel?.images?.map(
              ({ imagesFromColorModel }, imageIndex) => (
                <div key={imageIndex} style={{ position: "relative" }}>
                  <Upload
                    onChange={(info: any) =>
                      handleChange(
                        info,
                        colorsModel.id,
                        imagesFromColorModel.id
                      )
                    }
                    imageUrl={imagesFromColorModel.imagePath}
                  >
                    <Button type="link">
                      <PlusOutlined /> Add Image
                    </Button>
                  </Upload>
                  {colorsModel.images.length !== 0 && (
                    <Button
                      type="link"
                      danger
                      icon={<CloseOutlined />}
                      onClick={() =>
                        handleOpenDeleteModal(
                          colorsModel.id,
                          imagesFromColorModel?.id,
                          "image"
                        )
                      }
                      style={{ position: "absolute", top: 5, left: 5 }}
                    />
                  )}
                </div>
              )
            )}
            <Button type="link" onClick={() => handleAddImage(colorIndex)}>
              <PlusOutlined /> Add Image
            </Button>
          </Space>
        </Space>
      ))}

      <DeleteModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        handleOk={handleSubmitDelete}
      />

      <ColorModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        refetchGetApi={refetchGetApi}
      />
    </div>
  );
};

export default ProductImages;
