import ProductImages from "@/Features/admin/components/ProductsPage/ProductImage/ProductImage";
import { Button } from "@/ui";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Images = () => {
  const router = useRouter();
  const slug = router?.query?.id;
  const t = useTranslations();
  const {
    isLoading: isProductLoading,
    refetch: getOneProduct,
    data: productData,
  } = useQueryApiClient({
    request: {
      url: `Product/${slug}`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {},
  });

  useEffect(() => {
    if (slug) {
      getOneProduct();
    }
  }, [slug]);

  const handleBackButtonClick = () => {
    router.back();
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={handleBackButtonClick}
        label={t("Back")}
      />
      <ProductImages
        productData={productData.data}
        refetchGetApi={getOneProduct}
      />
    </div>
  );
};

export default Images;