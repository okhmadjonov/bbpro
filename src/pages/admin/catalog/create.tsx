import React from 'react'
import EditPage from '@/Features/admin/components/EditPage/EditPage';
import CatalogForm from '@/Features/admin/components/ActionForms/CatalogForm/index';

const Create = () => {
   
  return (
    <div>
      <EditPage
        link="Category/"
        multipart={true}
      >
       <CatalogForm/>
      </EditPage>
    </div>
  )
}

export default Create