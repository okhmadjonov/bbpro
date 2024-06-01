import React from 'react'
import EditPage from '@/Features/admin/components/EditPage/EditPage';
import AboutUsForm from '@/Features/admin/components/ActionForms/AboutUsForm/index';
const Create = () => {
   
  return (
    <div>
      <EditPage
        link="AboutUs/" 
      >
       <AboutUsForm/>
      </EditPage>
    </div>
  )
}

export default Create