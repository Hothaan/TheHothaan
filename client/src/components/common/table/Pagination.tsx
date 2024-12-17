/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination(prop: PaginationProps) {
  const { currentPage, totalPages, onPageChange } = prop;

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const paginationContainer = css`
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `;

  const buttonStyle = (isActive: boolean) => css`
    padding: 8px 12px;
    border: 1px solid ${isActive ? "#119CD4" : "#DEDEDE"};
    background-color: #fff;
    color: ${isActive ? "#119CD4" : "#383838"};
    border-radius: 4px;
    cursor: pointer;

    transition: all 0.3 ease;

    color: ${isActive ? "#119CD4" : "#747474"};
    text-align: center;

    font-family: Montserrat;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 130%;

    &:hover {
      background-color: #dedede;
    }
  `;

  const disabledButtonStyle = css`
    padding: 8px 12px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    color: #bbb;
    border-radius: 4px;
    cursor: not-allowed;
  `;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          css={buttonStyle(i === currentPage)}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div css={paginationContainer}>
      <button
        css={currentPage === 1 ? disabledButtonStyle : buttonStyle(false)}
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        css={currentPage === 1 ? disabledButtonStyle : buttonStyle(false)}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {renderPageNumbers()}
      <button
        css={
          currentPage === totalPages ? disabledButtonStyle : buttonStyle(false)
        }
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        css={
          currentPage === totalPages ? disabledButtonStyle : buttonStyle(false)
        }
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
}
