import { SelectedDataInterface } from "@/Components/Types";
import React, { useState, useEffect } from "react";
import useQueryApiClient from "@/utils/useQueryApiClient";
import StaticsModal from "../../ActionModals/StaticsModal";
import AboutForm from "../../ActionForms/AboutForm";
import AdminEditButton from "@/Components/AdminEditButton/index";
import { LocaleStringsInterface } from "@/Components/Types/index";
import { useLocale, useTranslations } from "next-intl";
import { BASE_URL } from "@/services/api";

const HomeBannerCard = () => {
  const t = useTranslations('ADMIN')
  const locale: string = useLocale();
  const [truncatedDescription, setTruncatedDescription] = useState("");
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const {
    data: homeBannerApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/HomeBanner/",
      method: "GET",
    },
  });

  const DescriptionLimit = homeBannerApiResponse && homeBannerApiResponse.data && homeBannerApiResponse.data[0] ? homeBannerApiResponse.data[0].description : '';
  
  useEffect(() => {
    const handleResize = () => {
        const screenWidth = window.innerWidth;
        let maxLength;

        if (screenWidth > 1350) {
            maxLength = 100;
        } else if (screenWidth > 1050) {
            maxLength = 80;
        } else if (screenWidth <= 1050) {
            maxLength = 100;
        } else {
            maxLength = 120;
        }

        if (DescriptionLimit) {
            const localeDescription = DescriptionLimit[locale as keyof LocaleStringsInterface];
            if (localeDescription) {
                const truncatedDescription =
                    localeDescription.slice(0, maxLength) +
                    (localeDescription.length > maxLength ? "..." : "");
                setTruncatedDescription(truncatedDescription);
            }
        }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, [DescriptionLimit, locale]);

  const handleDataUpdateSuccess = (updatedData: any) => {
    const newData = [...homeBannerApiResponse.data];
    if (newData.length > 0) {
      newData[0] = updatedData;
    }
    refetchGetApi();
  };

  const handleOpenEditModal = (data: any) => {
    setSelectedData({ type: "edit", data });
  };

  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("HomeHeader")}</h1>
      </div>
      {homeBannerApiResponse.data && homeBannerApiResponse.data.length > 0 && (
        <div>
          {homeBannerApiResponse.data[0].imageUrl && (
            <img
              src={`${BASE_URL}/${homeBannerApiResponse.data[0].imageUrl}`}
              alt="About Header"
            />
          )}
          <h2>
            {
              homeBannerApiResponse.data[0].title[
                locale as keyof LocaleStringsInterface
              ]
            }
          </h2>
          <div dangerouslySetInnerHTML={{ __html: truncatedDescription }}></div>
        </div>
      )}
      <AdminEditButton
        onClick={() => handleOpenEditModal(homeBannerApiResponse.data[0])}
      />
      <StaticsModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        link="HomeBanner/"
        multipart={true}
        onSuccess={handleDataUpdateSuccess}
      >
        <AboutForm data={selectedData.data} />
      </StaticsModal>
    </div>
  );
};

export default HomeBannerCard;
