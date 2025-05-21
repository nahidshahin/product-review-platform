import { Pagination as PaginationType } from '../types';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages, hasNext, hasPrevious } = pagination;

  const nums = Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <a className="page-link" href="#" onClick={() => onPageChange(page)}>{page}</a>
            </li>
    ));            
  return(
    <nav aria-label="Page navigation example" className="mt-5">
        <ul className="pagination justify-content-center">
            <li className={`page-item ${!hasPrevious ? 'disabled' : ''}`}>
                <a className="page-link"
                onClick={() => onPageChange(currentPage - 1)}
                href="#"
                >Previous</a>
            </li>
            {nums}
            <li className={`page-item ${!hasNext ? 'disabled' : ''}`}>
                <a className="page-link"
                onClick={() => onPageChange(currentPage + 1)}
                href="#">Next</a>
            </li>
        </ul>
    </nav>    
  );
};  

export default Pagination;