import React from 'react';

export class Pagination {
  pageSize: number = 10;
  pageIndex: number = 1;
  totalPages?: number = 0;
  totalCount?: number = 0;
}

export const usePagination = () => {
  const [pagination, SetPagination] = React.useState<Pagination>(
    new Pagination()
  );

  const paginate = <T>(array: T[]): T[] => {
    pagination.totalCount = array.length;

    return array.slice(
      (pagination.pageIndex - 1) * pagination.pageSize,
      pagination.pageIndex * pagination.pageSize
    );
  };

  return {
    pagination,
    SetPagination,
    paginate,
  };
};
