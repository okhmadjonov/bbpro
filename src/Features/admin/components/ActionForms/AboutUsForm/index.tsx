import React from "react";
import LanguageFormList from "@/ui/LanguageFormList/LanguageFormList";

interface Props {
  data?: any;
}

const AboutUsForm = ({ data }: Props) => {
  return (
    <div>
      <LanguageFormList listName="title" />
      <LanguageFormList inputType="richTextarea" listName="description" />
      <LanguageFormList inputType="richTextarea" listName="subDescription" />
    </div>
  );
};

export default AboutUsForm;
