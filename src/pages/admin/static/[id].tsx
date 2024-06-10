import React, { useState, useEffect } from 'react';
import EditPage from '@/Features/admin/components/EditPage/EditPage';
import { useRouter } from '../../../../node_modules/next/router';
import useQueryApiClient from '@/utils/useQueryApiClient';


const Edit = () => {
  const router = useRouter();
  const slug = router?.query?.id;
  const [data, setData] = useState<any>({})
  
  const { isLoading: getOneLoading, refetch: getOneData } = useQueryApiClient({
    request: {
      url: `AboutUs/get_single_aboutUs/${slug}`,
      method: "GET",
      disableOnMount: true
    },
    onSuccess(res) {
      setData(res.data);
    },
  });

  useEffect(() => {
    if (slug) {
      getOneData();
    }
  }, [slug]);

  return (
    <div>
      <EditPage
        link="Products/get_single_news"
        data={data}
      >
      
      </EditPage>
    </div>
  );
};

export default Edit;
