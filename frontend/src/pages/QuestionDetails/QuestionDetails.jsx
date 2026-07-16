import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getQuestionById } from "../../api/QuestionService";
import {
    addFavorite,
    getFavoriteStatus,
    removeFavorite
} from "../../api/FavoriteService";
import { useAuth } from "../../context/AuthContext";

function QuestionDetails() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [error, setError] = useState("");
    const [favoriteError, setFavoriteError] = useState("");

    useEffect(() => {
        async function loadQuestion() {
            try {
                setLoading(true);
                setError("");

                const questionData = await getQuestionById(id);
                setQuestion(questionData);
            } catch (requestError) {
                setError(
                    requestError.response?.data?.error ||
                    "The question could not be loaded."
                );
            } finally {
                setLoading(false);
            }
        }

        loadQuestion();
    }, [id]);

    useEffect(() => {
        async function loadFavoriteStatus() {
            if (!isAuthenticated) {
                setFavorite(false);
                return;
            }

            try {
                const status = await getFavoriteStatus(id);
                setFavorite(status);
            } catch (requestError) {
                console.error(
                    "Favorite status could not be loaded.",
                    requestError
                );
            }
        }

        loadFavoriteStatus();
    }, [id, isAuthenticated]);

    async function handleFavoriteToggle() {
        try {
            setFavoriteLoading(true);
            setFavoriteError("");

            if (favorite) {
                await removeFavorite(id);
                setFavorite(false);
            } else {
                await addFavorite(id);
                setFavorite(true);
            }
        } catch (requestError) {
            setFavoriteError(
                requestError.response?.data?.error ||
                "Favorites could not be updated."
            );
        } finally {
            setFavoriteLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error}
                </div>
            </div>
        );
    }

    if (!question) {
        return null;
    }

    return (
        <main className="bg-light min-vh-100 py-4 py-md-5">
            <div className="container">
                <article className="card border-0 shadow-sm">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-4 mb-4">
                            <div>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    <span className="badge text-bg-primary">
                                        {question.category}
                                    </span>

                                    <span className="badge text-bg-warning">
                                        {question.difficulty}
                                    </span>
                                </div>

                                <h1 className="fw-bold mb-0">
                                    {question.title}
                                </h1>
                            </div>

                            <div className="d-grid d-md-block">
                                {isAuthenticated ? (
                                    <button
                                        type="button"
                                        className={
                                            favorite
                                                ? "btn btn-danger"
                                                : "btn btn-outline-primary"
                                        }
                                        disabled={favoriteLoading}
                                        aria-pressed={favorite}
                                        onClick={handleFavoriteToggle}
                                    >
                                        {favoriteLoading
                                            ? "Saving..."
                                            : favorite
                                                ? "♥ Saved"
                                                : "♡ Save to favorites"}
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="btn btn-outline-primary"
                                    >
                                        Login to save
                                    </Link>
                                )}
                            </div>
                        </div>

                        {favoriteError && (
                            <div
                                className="alert alert-danger"
                                role="alert"
                            >
                                {favoriteError}
                            </div>
                        )}

                        <hr />

                        <section className="py-3">
                            <h2 className="h4 fw-bold">
                                Question
                            </h2>

                            <p className="text-secondary mb-0">
                                {question.question}
                            </p>
                        </section>

                        <section className="py-3">
                            <h2 className="h4 fw-bold">
                                Answer
                            </h2>

                            <p className="text-secondary mb-0">
                                {question.answer}
                            </p>
                        </section>

                        <div className="mt-4">
                            <Link
                                to="/questions"
                                className="btn btn-outline-secondary"
                            >
                                Back to questions
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default QuestionDetails;