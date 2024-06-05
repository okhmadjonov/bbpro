import React from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import ServicesForm from "@/Features/admin/components/ActionForms/ServicesForm";

const Create = () => {
  return (
    <div>
      <EditPage link="Solution/" multipart={true}>
        <ServicesForm />
      </EditPage>
    </div>
  );
};

export default Create;
