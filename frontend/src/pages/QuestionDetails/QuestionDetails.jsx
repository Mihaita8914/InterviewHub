import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import "../../components/Common/RichTextEditor.css";
import { markQuestionAsViewed, markQuestionAsCompleted, getQuestionProgressStatus } from "../../api/ProgressService";

import { getQuestionById } from "../../api/QuestionService";
import { addFavorite, getFavoriteStatus, removeFavorite } from "../../api/FavoriteService";
import { useAuth } from "../../context/AuthContext";
import FollowUpQuestions from "../../components/FollowUpQuestions/FollowUpQuestions";

function formatLabel(value) {
    if (!value) {
        return "";
    }

    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}


function QuestionDetails() {
    const { id } = useParams();
    const location = useLocation();
    const backToQuestions = location.state?.from || "/questions";
    const { isAuthenticated } = useAuth();

    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [error, setError] = useState("");
    const [favoriteError, setFavoriteError] = useState("");
    const [progressStatus, setProgressStatus] = useState(null);
    const [progressLoading, setProgressLoading] = useState(false);

    useEffect(() => {
        async function loadQuestion() {
            try {
                setLoading(true);
                setError("");

                const questionData = await getQuestionById(id);

                setQuestion(questionData);

                if (isAuthenticated) {
                    try {
                        await markQuestionAsViewed(questionData.id);
                    } catch (error) {
                        console.error(
                            "Progress could not be saved.",
                            error
                        );
                    }
                }
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
        }, [id, isAuthenticated]);

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

    useEffect(() => {
    async function loadProgressStatus() {
        if (!isAuthenticated) {
            setProgressStatus(null);
            return;
        }

        try {
            const status = await getQuestionProgressStatus(id);
            setProgressStatus(status.status);
        } catch (error) {
            console.error(
                "Progress status could not be loaded.",
                error
            );
        }
    }

    loadProgressStatus();
}, [id, isAuthenticated]);

async function handleMarkCompleted() {
    try {
        setProgressLoading(true);

        await markQuestionAsCompleted(question.id);

        setProgressStatus("COMPLETED");
    } catch (error) {
        console.error(
            "Progress could not be saved.",
            error
        );
    } finally {
        setProgressLoading(false);
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
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>

                <Link
                    to={backToQuestions}
                    className="btn btn-outline-secondary"
                >
                    Back to questions
                </Link>
            </div>
        );
    }

    if (!question) {
        return null;
    }


    return (
        <main className="bg-light min-vh-100 py-4 py-md-5">
                        <div className="container">
                                <div className="mb-3">
                    <Link
                        to={backToQuestions}
                        className="text-decoration-none text-secondary fw-semibold"
                    >
                        ← Back to questions
                    </Link>
                </div>
                <article className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-4 mb-4">
                            <div>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    <span className="badge text-bg-primary">
                                        {question.category === "JAVA"
                                            ? "Java Core"
                                            : formatLabel(question.category)}
                                    </span>

                                    {question.topic && (
                                        <span className="badge text-bg-info">
                                            {formatLabel(question.topic)}
                                        </span>
                                    )}

                                        <span
                                            className={
                                                question.difficulty === "EASY"
                                                    ? "badge text-bg-success"
                                                    : question.difficulty === "HARD"
                                                        ? "badge text-bg-danger"
                                                        : "badge text-bg-warning"
                                            }
                                        >
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

                        <section className="py-4">
                            <div className="bg-light rounded-4 p-4">
                                <span className="text-primary text-uppercase fw-bold small">
                                    Interview Question
                                </span>

                                <p className="fs-5 fw-semibold mt-2 mb-0">
                                    {question.question}
                                </p>
                            </div>
                        </section>

                        <section className="py-3">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <span
                                    className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
                                    style={{
                                        width: "32px",
                                        height: "32px"
                                    }}
                                >
                                    ✓
                                </span>

                                <h2 className="h4 fw-bold mb-0">
                                    Answer
                                </h2>
                            </div>

                            <div
                                className="rich-text-display text-secondary"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        question.answer || ""
                                    )
                                }}
                            />
                        </section>

                        {question.exampleCode && (
                            <section className="py-3">
                                <h2 className="h4 fw-bold">
                                    Example Code
                                </h2>

                                <pre className="bg-dark text-light rounded p-3 overflow-auto mb-0">
                                    <code>{question.exampleCode}</code>
                                </pre>
                            </section>
                        )}

                        {question.commonMistakes && (
                            <section className="py-3">
                                <h2 className="h4 fw-bold">
                                    Common Mistakes
                                </h2>

                                <div className="alert alert-warning border-0 rounded-4 mb-0">
                                    <div className="question-multiline-text">
                                        {question.commonMistakes}
                                    </div>
                                </div>
                            </section>
                        )}

                        <FollowUpQuestions
                            value={question.followUpQuestions}
                        />

                        <div className="d-flex flex-column flex-sm-row gap-2 mt-4 pt-4 border-top">
                        {isAuthenticated && (
                            <button
                                type="button"
                                className={
                                    progressStatus === "COMPLETED"
                                        ? "btn btn-success"
                                        : "btn btn-outline-success"
                                }
                                onClick={handleMarkCompleted}
                                disabled={
                                    progressLoading ||
                                    progressStatus === "COMPLETED"
                                }
                            >
                                {progressLoading
                                    ? "Saving..."
                                    : progressStatus === "COMPLETED"
                                        ? "✓ Completed"
                                        : "Mark as completed"}
                            </button>
                        )}
                        <Link
                            to={backToQuestions}
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