import React from 'react';
import { Pagination as AntdPagination } from 'antd';
import type { PaginationProps } from 'antd';
import SvgSelector from '@/Assets/Icons/SvgSelector';

const Pagination = ({ current, pageSize, onChange, total, prevIcon, nextIcon }: PaginationProps) => {
  return (

<>
      <AntdPagination
        current={current}
        pageSize={pageSize}
        onChange={onChange}
        total={total}
        prevIcon={<SvgSelector id='prev-svg'/>}
        nextIcon={<SvgSelector id='next-svg' />}
        className='pagination-section'
        showSizeChanger={false}
      />
</>
  );
};

export default Pagination;
