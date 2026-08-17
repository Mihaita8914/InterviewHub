import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import DOMPurify from "dompurify";

import { getQuestions } from "../../api/QuestionService";
import { getQuestionProgressStatus, markQuestionAsCompleted, markQuestionAsViewed } from "../../api/ProgressService";
import FollowUpQuestions from "../../components/FollowUpQuestions/FollowUpQuestions";

import "../../components/Common/RichTextEditor.css";

function formatLabel(value) {
    if (!value) {
        return "";
    }

    return value
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

function Practice() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const category = searchParams.get("category") || "";
    const topic = searchParams.get("topic") || "";
    const difficulty = searchParams.get("difficulty") || "";
    
    const [finished, setFinished] = useState(false);

    const [question, setQuestion] = useState(null);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const indexFromUrl = Number(searchParams.get("index")) || 0;
    const [currentIndex, setCurrentIndex] = useState(indexFromUrl);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [progressStatus, setProgressStatus] =
        useState(null);

    const [progressLoading, setProgressLoading] =
        useState(false);

    const [showAnswer, setShowAnswer] =
        useState(false);

    const currentQuestion = question;

    useEffect(() => {
        async function loadPracticeQuestions() {
            try {
                setLoading(true);
                setError("");

                const data = await getQuestions({
                    page: currentIndex,
                    size: 1,
                    category,
                    topic,
                    difficulty
                });

                setQuestion(data.content?.[0] || null);
                setTotalQuestions(data.totalElements || 0);
            } catch (requestError) {
                setError(
                    requestError.response?.data?.error ||
                    "Practice questions could not be loaded."
                );
            } finally {
                setLoading(false);
            }
        }

        loadPracticeQuestions();
    }, [
        currentIndex,
        category,
        topic,
        difficulty
    ]);

    useEffect(() => {
        async function updateCurrentQuestionProgress() {
            if (!currentQuestion) {
                return;
            }
            setShowAnswer(false);

            try {
                await markQuestionAsViewed(
                    currentQuestion.id
                );

                const status =
                    await getQuestionProgressStatus(
                        currentQuestion.id
                    );

                setProgressStatus(status.status);
            } catch (progressError) {
                console.error(
                    "Practice progress could not be loaded.",
                    progressError
                );
            }
        }

        updateCurrentQuestionProgress();
    }, [currentQuestion]);

    async function handleMarkCompleted() {
        if (!currentQuestion) {
            return;
        }

        try {
            setProgressLoading(true);

            await markQuestionAsCompleted(
                currentQuestion.id
            );

            setProgressStatus("COMPLETED");
        } catch (progressError) {
            console.error(
                "Practice progress could not be saved.",
                progressError
            );
        } finally {
            setProgressLoading(false);
        }
    }

    function handlePrevious() {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    }

    function handleNext() {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(currentIndex + 1);
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

                <p className="text-secondary mt-3">
                    Preparing practice session...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    {error}
                </div>

                <Link
                    to="/questions"
                    className="btn btn-outline-secondary"
                >
                    Back to questions
                </Link>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className="container py-5">
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center p-5">
                        <h1 className="h4 fw-bold">
                            No questions available
                        </h1>

                        <p className="text-secondary">
                            Try another category, topic or difficulty.
                        </p>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                                navigate("/questions")
                            }
                        >
                            Browse questions
                        </button>
                    </div>
                </div>
            </div>
        );
    }

        const percentage =
            totalQuestions === 0
                ? 0
                : Math.round(
                    ((currentIndex + 1) / totalQuestions) * 100
                );
    if (finished) {
    return (
        <main className="bg-light min-vh-100 py-5">
            <div className="container">
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center p-4 p-md-5">

                        <div className="display-4 mb-3">
                            ✓
                        </div>

                        <h1 className="fw-bold mb-3">
                            Practice completed
                        </h1>

                        <p className="text-secondary mb-4">
                            You reached the end of this practice session.
                        </p>

                        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                            {category && (
                                <span className="badge text-bg-primary">
                                    {category === "JAVA"
                                        ? "Java Core"
                                        : formatLabel(category)}
                                </span>
                            )}

                            {topic && (
                                <span className="badge text-bg-info">
                                    {formatLabel(topic)}
                                </span>
                            )}

                            {difficulty && (
                                <span
                                    className={
                                        difficulty === "EASY"
                                            ? "badge text-bg-success"
                                            : difficulty === "HARD"
                                                ? "badge text-bg-danger"
                                                : "badge text-bg-warning"
                                    }
                                >
                                    {formatLabel(difficulty)}
                                </span>
                            )}
                        </div>

                        <div className="row justify-content-center mb-4">
                            <div className="col-12 col-md-5">
                                <div className="border rounded p-4">
                                    <p className="text-secondary mb-2">
                                        Questions in this session
                                    </p>

                                    <p className="display-5 fw-bold mb-0">
                                        {totalQuestions}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">

                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    setCurrentIndex(0);
                                    setFinished(false);
                                }}
                            >
                                Practice again
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            >
                                Back to dashboard
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}            

    return (
        <main className="bg-light min-vh-100 py-4 py-md-5">
            <div className="container">
                <div className="mb-4">
                    <div className="d-flex flex-column flex-md-row justify-content-between gap-3 align-items-md-center">
                        <div>
                            <span className="badge text-bg-primary mb-2">
                                Practice Mode
                            </span>

                            <h1 className="h3 fw-bold mb-1">
                                {category
                                    ? formatLabel(category)
                                    : "Interview Practice"}
                            </h1>

                            <p className="text-secondary mb-0">
                                Question {currentIndex + 1} of{" "}
                                {totalQuestions}
                            </p>
                        </div>

                        <Link
                            to="/questions"
                            className="btn btn-outline-secondary"
                        >
                            Exit practice
                        </Link>
                    </div>

                    <div className="progress mt-3">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${percentage}%`
                            }}
                        >
                            {percentage}%
                        </div>
                    </div>
                </div>

                <article className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <span className="badge text-bg-primary">
                                {currentQuestion.category === "JAVA"
                                    ? "Java Core"
                                    : formatLabel(
                                        currentQuestion.category
                                    )}
                            </span>

                            {currentQuestion.topic && (
                                <span className="badge text-bg-info">
                                    {formatLabel(
                                        currentQuestion.topic
                                    )}
                                </span>
                            )}

                                <span
                                    className={
                                        currentQuestion.difficulty === "EASY"
                                            ? "badge text-bg-success"
                                            : currentQuestion.difficulty === "HARD"
                                                ? "badge text-bg-danger"
                                                : "badge text-bg-warning"
                                    }
                                >
                                    {formatLabel(
                                        currentQuestion.difficulty
                                    )}
                                </span>
                        </div>

                        <h2 className="h3 fw-bold">
                            {currentQuestion.title}
                        </h2>

                        <section className="py-3">
                            <div className="bg-light rounded-4 p-4">
                                <span className="text-primary text-uppercase fw-bold small">
                                    Interview Question
                                </span>

                                <p className="fs-5 fw-semibold mt-2 mb-0">
                                    {currentQuestion.question}
                                </p>
                            </div>
                        </section>

                        {!showAnswer ? (
                            <div className="text-center py-4 py-md-5">
                                <p className="text-secondary mb-3">
                                    Answer the question yourself first, just like
                                    in a real interview. Reveal the prepared answer
                                    when you're ready.
                                </p>

                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={() => setShowAnswer(true)}
                                >
                                    Check my answer
                                </button>
                            </div>
                        ) : (
                            <>
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

                                        <h3 className="h5 fw-bold mb-0">
                                            Answer
                                        </h3>
                                    </div>

                                    <div
                                        className="rich-text-display text-secondary"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(
                                                currentQuestion.answer || ""
                                            )
                                        }}
                                    />
                                </section>

                                {currentQuestion.exampleCode && (
                                    <section className="py-3">
                                        <h3 className="h5 fw-bold">
                                            Example Code
                                        </h3>

                                        <pre className="bg-dark text-light rounded p-3 overflow-auto">
                                            <code>
                                                {currentQuestion.exampleCode}
                                            </code>
                                        </pre>
                                    </section>
                                )}

                                {currentQuestion.commonMistakes && (
                                    <section className="py-3">
                                        <h3 className="h5 fw-bold">
                                            Common Mistakes
                                        </h3>

                                        <div className="alert alert-warning border-0 rounded-4 mb-0">
                                            {currentQuestion.commonMistakes}
                                        </div>
                                    </section>
                                )}

                                <FollowUpQuestions
                                    value={currentQuestion.followUpQuestions}
                                />
                            </>
                        )}

                        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={handlePrevious}
                                disabled={currentIndex === 0}
                            >
                                ← Previous
                            </button>

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
                                    progressStatus === "COMPLETED" ||
                                    !showAnswer
                                }
                            >
                                {progressLoading
                                    ? "Saving..."
                                    : progressStatus === "COMPLETED"
                                        ? "✓ Completed"
                                        : "Mark as completed"}
                            </button>

                            {currentIndex < totalQuestions - 1 ? (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleNext}
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setFinished(true)}
                            >
                                Finish practice ✓
                            </button>
                        )}
                        </div>
                    </div>
                </article>
            </div>
        </main>
    );
}

export default Practice;