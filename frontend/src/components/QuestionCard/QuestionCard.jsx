import { useLocation, useNavigate } from "react-router-dom";
import "./QuestionCard.css";

function QuestionCard({ question }) {
    const navigate = useNavigate();
    const location = useLocation();

    function formatLabel(value) {
        if (!value) {
            return "";
        }

        return value
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, letter =>
                letter.toUpperCase()
            );
    }

    function handleOpenQuestion() {
        navigate(
            `/questions/${question.id}`,
            {
                state: {
                    from: `${location.pathname}${location.search}`
                }
            }
        );
    }

    return (
        <article
            className="card border-0 shadow-sm mb-3 question-card"
            onClick={handleOpenQuestion}
        >
            <div className="card-body p-4">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3">

                    <div className="flex-grow-1">
                        <div className="d-flex flex-wrap gap-2 mb-3">
                            <span className="badge text-bg-primary">
                                {question.category === "JAVA"
                                    ? "Java Core"
                                    : formatLabel(
                                        question.category
                                    )}
                            </span>

                            {question.topic && (
                                <span className="badge text-bg-info">
                                    {formatLabel(
                                        question.topic
                                    )}
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

                        <h2 className="h4 fw-bold mb-2">
                            {question.title}
                        </h2>

                        <p className="text-secondary mb-0">
                            {question.question}
                        </p>
                    </div>

                    <div className="d-flex align-items-center">
                        <span className="text-primary fw-semibold text-nowrap">
                            View question →
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default QuestionCard;