import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getQuestions } from "../../api/QuestionService";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";

function Questions() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const categoryFromUrl = searchParams.get("category") || "";
    const topicFromUrl = searchParams.get("topic") || "";
    const difficultyFromUrl = searchParams.get("difficulty") || "";
    const searchFromUrl = searchParams.get("keyword") || "";
    const pageFromUrl = Number(searchParams.get("page")) || 0;

    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState(searchFromUrl);
    const [category, setCategory] = useState(categoryFromUrl);
    const [topic, setTopic] = useState(topicFromUrl);
    const [difficulty, setDifficulty] = useState(difficultyFromUrl);
    const [currentPage, setCurrentPage] = useState(pageFromUrl);
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
            topic,
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
        topic,
        difficulty,
        reloadKey
    ]);


    function updateSearchParams(changes) {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
        if (
            value === "" ||
            value === null ||
            value === undefined
        ) {
            nextParams.delete(key);
        } else {
            nextParams.set(key, String(value));
        }
    });

    setSearchParams(nextParams);
}

function handleSearchChange(value) {
    setSearchTerm(value);
    setCurrentPage(0);

    updateSearchParams({
        keyword: value,
        page: 0
    });
}

function handleCategoryChange(value) {
    setCategory(value);
    setTopic("");
    setCurrentPage(0);

    updateSearchParams({
        category: value,
        topic: "",
        page: 0
    });
}

function handleTopicChange(value) {
    setTopic(value);
    setCurrentPage(0);

    updateSearchParams({
        topic: value,
        page: 0
    });
}

function handleDifficultyChange(value) {
    setDifficulty(value);
    setCurrentPage(0);

    updateSearchParams({
        difficulty: value,
        page: 0
    });
}

function handlePageChange(page) {
    setCurrentPage(page);

    updateSearchParams({
        page
    });
}

function handleRetry() {
    setReloadKey(currentValue => currentValue + 1);
}

    function handleStartPractice() {
        const params = new URLSearchParams();

        if (category) {
            params.set("category", category);
        }

        if (topic) {
            params.set("topic", topic);
        }

        if (difficulty) {
            params.set("difficulty", difficulty);
        }

        const query = params.toString();

        navigate(
            query
                ? `/practice?${query}`
                : "/practice"
        );
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
                            topic={topic}
                            difficulty={difficulty}
                            onCategoryChange={handleCategoryChange}
                            onTopicChange={handleTopicChange}
                            onDifficultyChange={handleDifficultyChange}
                        />

                        <div className="d-flex justify-content-end mt-3">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleStartPractice}
                            >
                                Start Practice
                            </button>
                        </div>
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
                            onPageChange={handlePageChange}
                        />
                    )}
            </div>
        </main>
    );
}

export default Questions;