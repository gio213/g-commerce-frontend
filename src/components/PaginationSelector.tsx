import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationSelector = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((number, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(number)}
              isActive={currentPage === number}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
