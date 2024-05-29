import React from "react";
import Loader from "@/Components/Loader/Loader";
import dynamic from "next/dynamic";
import GoToBack from "@/Components/GoToBack";
import { ContactInterface } from "@/Components/Types";

const ContactPage = dynamic(
  () => import("@/Features/Contact/ContactSection/"),
  {
    loading: () => <Loader />,
  }
);
const PageTitle = dynamic(() => import("@/Components/PageTitle"), {
  loading: () => <Loader />,
});

interface ContactProps {
  contact: ContactInterface[];
}

export default function Contact({ contact }: ContactProps) {
  return (
    <div className="container">
      <div className="container_top_padding">
        <GoToBack pathArr={[{ title: "contact", path: "locations" }]} />
        <PageTitle />
        <ContactPage contact={contact} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const contactData = {
    data: [
      {
        id: 1,
        title: "Головной офис",
        mapFrame:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47958.889215118455!2d69.17415543125003!3d41.299495799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b3f94aca4e9%3A0xf40532aed6ec9253!2sART%20ECOLINE!5e0!3m2!1sru!2s!4v1715",
        address: {
          uz: "Toshkent shahri, Yangixayot tumani, Ulus Xushnud, Do‘stlik ko‘chasi, 58-uy.",
          ru: "Город Ташкент, район Янгихайот, Улус Хушнуд, улица Дустлик, дом 58.",
          en: "Tashkent city, Yangikhayot district, Ulus Khushnud, Dustlik street, building 58.",
        },
        phone: ["+99890 000 00 00"],
        email: "bigboxpro@gmail.com",
        workDay: {
          uz: "Dushanba-Jum 10:00–18:00",
          ru: "ПН-Пт 10:00–18:00",
          en: "Mon-Fri 10:00–18:00",
        },
        weekend: {
          uz: "Shanba-Yak Yopiq",
          ru: "СБ-ВС Выходной",
          en: "Sat-Sun Closed",
        },
        createdAt: "2024-03-28T11:27:07.249555Z",
        updatedAt: "2024-05-17T09:27:30.048695Z",
      },
    ],
  };

  return {
    props: {
      contact: contactData.data || [],
    },
  };
};
