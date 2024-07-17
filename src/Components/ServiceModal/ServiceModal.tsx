import React from 'react';
import styles from './ServiceModal.module.scss';
import { API, axiosHeadersSetToken } from '@/services/api';

interface ServiceModalProps {
  servicelist: any[];
  catalogCategory: any[];
}

const ServiceModal: React.FC<ServiceModalProps> = ({ servicelist, catalogCategory }) => {
  return (
    <div className={styles.servicemodal}>
      <div className={styles.servicemodal_item}>
        <h2>Service List</h2>
        <ul>
          {servicelist.map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </ul>
      </div>
      <div className={styles.servicemodal_item}>
        <h2>Catalog Category</h2>
        <ul>
          {catalogCategory.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceModal;

export const getServerSideProps = async (context: any) => {
  try {
    await axiosHeadersSetToken(context);

    const servicesListResponse = await API.getSolutionsList();

    const catalogCategoryResponse = await API.getCatalogCategory()
      .then((res: any) => res)
      .catch((error: any) => {
        return { data: [] };
      });

    return {
      props: {
        servicelist: servicesListResponse.data || [],
        catalogCategory: catalogCategoryResponse.data || [],
      },
    };
  } catch (error) {
    return {
      props: {
        servicelist: [],
        catalogCategory: [],
      },
    };
  }
};
