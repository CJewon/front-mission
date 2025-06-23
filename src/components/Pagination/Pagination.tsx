import React, { useCallback } from "react";

interface PaginationProps {
  count: number;
  onPageChange: (page: number) => void;
  currentPage: number;
  pageSize: number;
}

export default function Pagination({
  count,
  onPageChange,
  currentPage,
  pageSize,
}: PaginationProps) {
  const totalPage = Math.ceil(count / pageSize);
  const startNum = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const pages = Array.from(
    { length: Math.min(5, totalPage - startNum + 1) },
    (_, i) => startNum + i
  );

  const selectPage = useCallback(
    (pageNum: number) => {
      onPageChange(pageNum);
    },
    [onPageChange]
  );

  const prevClick = () => selectPage(startNum - 5);
  const nextClick = () => selectPage(startNum + 5);

  const disabledLeft = currentPage <= 5;
  const disabledRight = currentPage >= totalPage || totalPage <= 5;

  return (
    <div className="Pagination">
      {pages.length === 0 ? (
        <div className="Pagination__empty" />
      ) : (
        <>
          <button
            type="button"
            onClick={prevClick}
            disabled={disabledLeft}
            className={`Pagination__arrow ${disabledLeft ? "disabled" : ""}`}
          >
            {"<"}
          </button>

          {pages.map((num) => {
            const isActive = num === currentPage;
            return (
              <button
                key={num}
                type="button"
                onClick={() => selectPage(num)}
                className={`Pagination__page ${isActive ? "active" : ""}`}
              >
                {num}
              </button>
            );
          })}

          <button
            type="button"
            onClick={nextClick}
            disabled={disabledRight}
            className={`Pagination__arrow ${disabledRight ? "disabled" : ""}`}
          >
            {">"}
          </button>
        </>
      )}
    </div>
  );
}
