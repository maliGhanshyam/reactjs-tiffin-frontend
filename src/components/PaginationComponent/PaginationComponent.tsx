import React from 'react';
import { Pagination } from '@mui/material';
import { PaginationComponentProps } from './PaginationComponent.types';
import { styles } from './Pagination.styles';

//Name componenet bcz mui have Pagination component
const PaginationComponent: React.FC<PaginationComponentProps> = ({ count, page, onChange }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onChange}
      variant="outlined"
      shape="rounded"
      sx={styles.paginationStyles}
    />
  );
};

export default PaginationComponent;
