import React from "react";
import EditPage from "@/Features/admin/components/EditPage/EditPage";
import ProductsForm from "@/Features/admin/components/ActionForms/ProductsForm/index";

const Create = () => {
  return (
    <div>
      <EditPage link="Product/" >
        <ProductsForm />
      </EditPage>
    </div>
  );
};

export default Create;
