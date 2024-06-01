import AdminTableList from "@/Components/AdminTableList";
import { SelectedDataInterface } from "@/Components/Types";
import React, { useState } from "react";
import useQueryApiClient from "@/utils/useQueryApiClient";
import StaticsModal from "../../ActionModals/StaticsModal";
import ContactForm from "../../ActionForms/ContactForm/index";
import { LocaleStringsInterface } from "@/Components/Types/index";
import { useLocale, useTranslations } from "next-intl";
import AdminEditButton from "@/Components/AdminEditButton/index";

const ContactCard = () => {
  const t = useTranslations('ADMIN')
  const locale: string = useLocale();
  const [selectedData, setSelectedData] = useState<SelectedDataInterface>({
    type: "default",
    data: {},
  });

  const {
    data: contactApiResponse,
    isLoading,
    refetch: refetchGetApi,
  } = useQueryApiClient({
    request: {
      url: "/Contact/",
      method: "GET",
    },
  });

  const handleDataUpdateSuccess = (updatedData: any) => {
    const newData = [...contactApiResponse.data];
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
        <h1>{t("Contacts")}</h1>
      </div>
      {contactApiResponse.data && contactApiResponse.data.length > 0 && (
        <div>
          <iframe
            src={contactApiResponse.data[0].mapFrame}
            style={{ border: 0, marginBottom: 20 }}
            loading="lazy"
          ></iframe>
          <h2>
            Address:{" "}
            {
              contactApiResponse.data[0].address[
                locale as keyof LocaleStringsInterface
              ]
            }
          </h2>
          <p>
            WorkDay:{" "}
            {
              contactApiResponse.data[0].workDay[
                locale as keyof LocaleStringsInterface
              ]
            }
          </p>
        </div>
      )}

      <AdminEditButton
        onClick={() => handleOpenEditModal(contactApiResponse.data[0])}
      />

      <StaticsModal
        selectedData={selectedData}
        setSelectedData={setSelectedData}
        link="Contact/"
        multipart={false}
        onSuccess={handleDataUpdateSuccess}
      >
        <ContactForm data={selectedData.data} />
      </StaticsModal>
    </div>
  );
};

export default ContactCard;
