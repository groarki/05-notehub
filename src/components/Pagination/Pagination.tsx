import ReactPaginate from 'react-paginate';
import css from "./Pagination.module.css"

interface paginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onPageChange }: paginationProps) {
    return (<ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
    />
    )
};