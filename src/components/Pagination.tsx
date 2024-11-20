import React from "react";
import "./Pagination.css";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Генерация номеров страниц
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages > 10) {
      // Всегда отображаем первую страницу
      pages.push(1);

      // Если текущая страница <= 7, показываем страницы 1-7
      if (currentPage < 7) {
        for (let i = 2; i <= 7; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
      // Если текущая страница > 7, показываем страницы вокруг текущей
      else if (currentPage >= 7 && currentPage < totalPages - 3) {
        console.log('test')
        pages.push("...");
        for (let i = currentPage; i <= currentPage + 2 && i < totalPages; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
      // Если текущая страница в конце, показываем последние страницы
      else {
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      }
    } else {
      // Если страниц меньше или равно 10, показываем все страницы
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  const handlePageChange = (page: number | string) => {
    if (typeof page === "number") {
      onPageChange(page);
    }
  };

  const pageNumbers = generatePageNumbers();



  return (
    <div style={{ marginTop: "1rem" }}>
      <div className="pagination">
        {/* Стрелка на первую страницу */}
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          {"<<"}
        </button>

        {/* Стрелка на предыдущую страницу */}
        <button
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"<"}
        </button>

        {/* Отображение номеров страниц */}
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
            disabled={page === "..."} // Отключаем кнопку для троеточия
          >
            {page}
          </button>
        ))}

        {/* Стрелка на следующую страницу */}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {">"}
        </button>

        {/* Стрелка на последнюю страницу */}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
