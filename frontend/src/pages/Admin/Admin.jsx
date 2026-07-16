import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getQuestions,
    deleteQuestion
} from "../../api/QuestionService";

function Admin() {
    const [questions, setQuestions] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 10;

    const navigate = useNavigate();

    useEffect(() => {
        const message = sessionStorage.getItem("successMessage");

        if (message) {
            setSuccessMessage(message);
            sessionStorage.removeItem("successMessage");

            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }

        const timeoutId = setTimeout(() => {
            setLoading(true);

            getQuestions({
                page: currentPage,
                size: pageSize,
                keyword: searchTerm
            })
                .then(data => {
                    setQuestions(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch(error => {
                    console.error("Failed to load questions:", error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, currentPage]);

    function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(id);

        deleteQuestion(id)
            .then(() => {
                setQuestions(currentQuestions => {
                    const updatedQuestions = currentQuestions.filter(
                        question => question.id !== id
                    );

                    if (
                        updatedQuestions.length === 0 &&
                        currentPage > 0
                    ) {
                        setCurrentPage(previousPage => previousPage - 1);
                    }

                    return updatedQuestions;
                });

                setSuccessMessage(
                    "Question deleted successfully."
                );

                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
            })
            .catch(error => {
                console.error(
                    "Failed to delete question:",
                    error
                );
            })
            .finally(() => {
                setDeletingId(null);
            });
    }

    return (
        <div className="container mt-4">

            {successMessage && (
                <div
                    className="alert alert-success alert-dismissible fade show"
                    role="alert"
                >
                    {successMessage}

                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setSuccessMessage("")}
                    />
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin Dashboard</h1>

                <button
                    className="btn btn-success"
                    onClick={() =>
                        navigate("/admin/questions/new")
                    }
                >
                    Add Question
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                        setCurrentPage(0);
                    }}
                />
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div
                        className="spinner-border"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                    <p className="mt-3">
                        Loading questions...
                    </p>
                </div>
            ) : questions.length === 0 ? (
                <div className="alert alert-info">
                    No questions found.
                </div>
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Difficulty</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {questions.map(question => (
                                    <tr key={question.id}>
                                        <td>{question.id}</td>

                                        <td>{question.title}</td>

                                        <td>{question.category}</td>

                                        <td>{question.difficulty}</td>

                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/questions/${question.id}/edit`
                                                    )
                                                }
                                                disabled={
                                                    deletingId === question.id
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(question.id)
                                                }
                                                disabled={
                                                    deletingId === question.id
                                                }
                                            >
                                                {deletingId === question.id ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />

                                                        Deleting...
                                                    </>
                                                ) : (
                                                    "Delete"
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {totalPages > 1 && (
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">

                                <li
                                    className={`page-item ${
                                        currentPage === 0
                                            ? "disabled"
                                            : ""
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(
                                                previousPage =>
                                                    previousPage - 1
                                            )
                                        }
                                        disabled={currentPage === 0}
                                    >
                                        Previous
                                    </button>
                                </li>

                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${
                                                currentPage === index
                                                    ? "active"
                                                    : ""
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                className="page-link"
                                                onClick={() =>
                                                    setCurrentPage(index)
                                                }
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    )
                                )}

                                <li
                                    className={`page-item ${
                                        currentPage === totalPages - 1
                                            ? "disabled"
                                            : ""
                                    }`}
                                >
                                    <button
                                        type="button"
                                        className="page-link"
                                        onClick={() =>
                                            setCurrentPage(
                                                previousPage =>
                                                    previousPage + 1
                                            )
                                        }
                                        disabled={
                                            currentPage === totalPages - 1
                                        }
                                    >
                                        Next
                                    </button>
                                </li>

                            </ul>
                        </nav>
                    )}
                </>
            )}

        </div>
    );
}

export default Admin;