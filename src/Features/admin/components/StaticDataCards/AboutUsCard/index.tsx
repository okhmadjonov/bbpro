import AdminTableList from "@/Components/AdminTableList";
import { SelectedDataInterface } from "@/Components/Types";
import React, { useState, useEffect } from "react";
import useQueryApiClient from "@/utils/useQueryApiClient";
import StaticsModal from "../../ActionModals/StaticsModal";
import AboutUsForm from "../../ActionForms/AboutUsForm/index";
import { LocaleStringsInterface } from "@/Components/Types/index";
import { useLocale, useTranslations } from "next-intl";
import AdminEditButton from "@/Components/AdminEditButton/index";
import { BASE_URL } from "@/services/api";

const AboutUsCard = () => {
  const t = useTranslations('ADMIN')
  const locale: string = useLocale();
  const [truncatedDescription, setTruncatedDescription] = useState("");
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  
  const {
    data: aboutUsApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/AboutUs/",
      method: "GET",
    },
  });
  const DescriptionLimit = aboutUsApiResponse && aboutUsApiResponse.data && aboutUsApiResponse.data[0] ? aboutUsApiResponse.data[0].description : '';
  
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

  const handleOpenEditModal = (data: any) => {
    setSelectedData({ type: "edit", data });
  };

  const handleDataUpdateSuccess = (updatedData: any) => {
    const newData = [...aboutUsApiResponse.data];
    if (newData.length > 0) {
      newData[0] = updatedData;
    }
    refetchGetApi();
  };

  return (
    <div>
      <div className="admin_page_title">
        <h1>{t("AboutUsSection")}</h1>
      </div>
      {aboutUsApiResponse.data && aboutUsApiResponse.data.length > 0 && (
        <div>
          {aboutUsApiResponse.data[0].imageUrl && (
            <img
              src={`${BASE_URL}/${aboutUsApiResponse.data[0].imageUrl}`}
              alt="About Header"
            />
          )}
          <h2>
            {
              aboutUsApiResponse.data[0].title[
                locale as keyof LocaleStringsInterface
              ]
            }
          </h2>
          <div dangerouslySetInnerHTML={{ __html: truncatedDescription }}></div>
        </div>
      )}
      <AdminEditButton
        onClick={() =>
          aboutUsApiResponse.data &&
          handleOpenEditModal(aboutUsApiResponse.data[0])
        }
      />

      <StaticsModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        link="/AboutUs/"
        onSuccess={handleDataUpdateSuccess}
        multipart={true}
      >
        <AboutUsForm data={selectedData.data} />
      </StaticsModal>
    </div>
  );
};

export default AboutUsCard;
