import { ReactElement, useEffect, useState } from 'react';

export type PaginationType = {
  onPageChange: (e: URLSearchParams) => void;
  totalPages: number;
  searchParams: URLSearchParams;
};

const Pagination = ({
  onPageChange,
  totalPages,
  searchParams,
}: PaginationType): ReactElement => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (searchParams.has('page'))
      setPage(parseInt(searchParams.get('page') as string));
  }, []);

  const handlePageChange = (newPage: number) => {
    scrollTo({ top: 0, behavior: 'smooth' });
    setPage(newPage);
    searchParams.set('page', newPage.toString());
    onPageChange(searchParams);
  };

  const goToPreviousPage = () => {
    handlePageChange(page > 1 ? page - 1 : page);
  };

  const goToNextPage = () => {
    handlePageChange(page < totalPages ? page + 1 : page);
  };

  return (
    <div className="ml-auto flex justify-center py-9">
      <button
        type="button"
        onClick={goToPreviousPage}
        aria-label="Go to previous page"
        disabled={page === 1}
      >
        <i className="fa-solid fa-caret-left"></i>
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button type="button" onClick={goToNextPage} aria-label="Go to next page">
        <i className="fa-solid fa-caret-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
