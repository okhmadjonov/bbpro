import React from "react";
import Loader from "@/Components/Loader/Loader";
import dynamic from "next/dynamic";
import GoToBack from "@/Components/GoToBack";
import { ContactInterface } from "@/Components/Types";
import { API } from "@/services/api";
import Head from "next/head";

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
    <div>
      <Head>
        <title>Contact</title>
      </Head>
      <div className="container">
        <div className="container_top_padding">
          <GoToBack pathArr={[{ title: "contact", path: "locations" }]} />
          <PageTitle />
          <ContactPage contact={contact} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (contact: any) => {
  const contactResponse = await API.getContact()
    .then((res: any) => res.data)
    .catch((error: any) => {
      return { data: [] };
    });

  return {
    props: {
      contact: contactResponse.data || [],
    },
  };
};
