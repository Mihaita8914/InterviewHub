import { useEffect, useState } from "react";
import { getQuestions } from "../../api/QuestionService";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let active = true;

        setLoading(true);
        setError("");

        getQuestions({
            page: currentPage,
            size: 5,
            keyword: searchTerm,
            category,
            difficulty
        })
            .then(data => {
                if (!active) {
                    return;
                }

                setQuestions(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(requestError => {
                if (!active) {
                    return;
                }

                setQuestions([]);
                setTotalPages(0);

                setError(
                    requestError.response?.data?.error ||
                    "Questions could not be loaded. Please try again."
                );
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, [
        currentPage,
        searchTerm,
        category,
        difficulty,
        reloadKey
    ]);

    function handleSearchChange(value) {
        setSearchTerm(value);
        setCurrentPage(0);
    }

    function handleCategoryChange(value) {
        setCategory(value);
        setCurrentPage(0);
    }

    function handleDifficultyChange(value) {
        setDifficulty(value);
        setCurrentPage(0);
    }

    function handleRetry() {
        setReloadKey(currentValue => currentValue + 1);
    }

    return (
        <main className="bg-light min-vh-100 py-4 py-md-5">
            <div className="container">
                <header className="text-center mb-4">
                    <span className="badge text-bg-primary mb-3">
                        INTERVIEW PRACTICE
                    </span>

                    <h1 className="fw-bold">
                        Java interview questions
                    </h1>

                    <p className="text-secondary">
                        Search by topic, choose a difficulty and prepare
                        at your own pace.
                    </p>
                </header>

                <section className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-3 p-md-4">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearchChange}
                        />

                        <FilterPanel
                            category={category}
                            difficulty={difficulty}
                            onCategoryChange={handleCategoryChange}
                            onDifficultyChange={
                                handleDifficultyChange
                            }
                        />
                    </div>
                </section>

                {error && (
                    <div
                        className="alert alert-danger d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3"
                        role="alert"
                    >
                        <span>{error}</span>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={handleRetry}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-5">
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <p className="text-secondary mt-3">
                            Loading questions...
                        </p>
                    </div>
                )}

                {!loading &&
                    !error &&
                    questions.length === 0 && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center p-5">
                                <h2 className="h4 fw-bold">
                                    No questions found
                                </h2>

                                <p className="text-secondary mb-0">
                                    Try another keyword or change the
                                    selected filters.
                                </p>
                            </div>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    questions.map(question => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                        />
                    ))}

                {!loading &&
                    !error &&
                    totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
            </div>
        </main>
    );
}

export default Questions;