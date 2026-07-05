function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {

    return (

        <nav className="mt-4">

            <ul className="pagination justify-content-center">

                <li
                    className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (

                    <li
                        key={index}
                        className={`page-item ${currentPage === index ? "active" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(index)}
                        >
                            {index + 1}
                        </button>
                    </li>

                ))}

                <li
                    className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}
                >
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </li>

            </ul>

        </nav>

    );
}

export default Pagination;