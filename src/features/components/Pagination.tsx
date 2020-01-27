import React from "react";
import _ from "lodash";

export type PaginationProps = {
  numberOfPages: number;
  onPageChange: (page: number) => void;
  actualPage: number;
};

const Pagination = ({
  numberOfPages,
  onPageChange,
  actualPage
}: PaginationProps) => {
  const arrayOfPages = _.range(1, numberOfPages + 1);

  return (
    <React.Fragment>
      {numberOfPages <= 1 ? null : (
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {arrayOfPages.map(page => (
              <li
                className={`${
                  page === actualPage ? "page-item active" : "page-item"
                } `}
                onClick={() => onPageChange(page)}
                key={page}
              >
                <div className="page-link">{page}</div>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </React.Fragment>
  );
};

export default Pagination;
