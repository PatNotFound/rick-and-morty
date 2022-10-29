import React, { ReactElement, useEffect, useState } from "react";

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (searchParams.has("page"))
      setPage(parseInt(searchParams.get("page") as string));
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const newSearchParams = new URLSearchParams({
      ...searchParams,
      page: newPage.toString(),
    });
    scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(newSearchParams);
  };

  const goToPrevPage = () => {
    let newPage = 1;

    if (page > 1) newPage = page - 1;

    handlePageChange(newPage);
  };

  const goToNextPage = () => {
    let newPage = page;

    if (page < totalPages) newPage = page + 1;

    handlePageChange(newPage);
  };

  return (
    <div className="ml-auto flex py-9">
      <button
        type="button"
        onClick={goToPrevPage}
        aria-label="Go to previous page"
        disabled={page === 1}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button type="button" onClick={goToNextPage} aria-label="Go to next page">
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
