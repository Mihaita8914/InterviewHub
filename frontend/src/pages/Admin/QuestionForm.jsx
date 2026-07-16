import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    createQuestion,
    getQuestionById,
    updateQuestion
} from "../../api/QuestionService";

function QuestionForm() {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [category, setCategory] = useState("JAVA");
    const [difficulty, setDifficulty] = useState("EASY");
    const [exampleCode, setExampleCode] = useState("");
    const [commonMistakes, setCommonMistakes] = useState("");
    const [followUpQuestions, setFollowUpQuestions] = useState("");
    const [published, setPublished] = useState(true);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const { id } = useParams();
    const [saving, setSaving] = useState(false);


    const isEditMode = Boolean(id);

    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        getQuestionById(id)
            .then(data => {
                setTitle(data.title || "");
                setQuestion(data.question || "");
                setAnswer(data.answer || "");
                setCategory(data.category || "JAVA");
                setDifficulty(data.difficulty || "EASY");
                setExampleCode(data.exampleCode || "");
                setCommonMistakes(data.commonMistakes || "");
                setFollowUpQuestions(data.followUpQuestions || "");
                setPublished(data.published ?? true);
            })
            .catch(error => {
                console.error("Failed to load question:", error);
            });
    }, [id, isEditMode]);

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = {};

        if (!title.trim()) {
            validationErrors.title = "Title is required.";
        }

        if (!question.trim()) {
            validationErrors.question = "Question is required.";
        }

        if (!answer.trim()) {
            validationErrors.answer = "Answer is required.";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        const questionData = {
            title,
            question,
            answer,
            category,
            difficulty,
            exampleCode,
            commonMistakes,
            followUpQuestions,
            published
        };

setSaving(true);

const saveRequest = isEditMode
    ? updateQuestion(id, questionData)
    : createQuestion(questionData);

saveRequest
    .then(() => {
        sessionStorage.setItem(
            "successMessage",
            isEditMode
                ? "Question updated successfully."
                : "Question created successfully."
        );

        navigate("/admin");
    })
    .catch(error => {
        console.error("Failed to save question:", error);
    })
    .finally(() => {
        setSaving(false);
    });
    }

    return (
        <div className="container mt-4">

            <h2>
                {isEditMode ? "Edit Question" : "Add Question"}
            </h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Title
                    </label>

                    <input
                        type="text"
                        className={`form-control ${errors.title ? "is-invalid" : ""}`}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    {errors.title && (
                        <div className="invalid-feedback">
                            {errors.title}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Question
                    </label>

                    <textarea
                        className={`form-control ${errors.question ? "is-invalid" : ""}`}
                        rows="4"
                        value={question}
                        onChange={(event) => setQuestion(event.target.value)}
                    />

                    {errors.question && (
                        <div className="invalid-feedback">
                            {errors.question}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Answer
                    </label>

                    <textarea
                        className={`form-control ${errors.answer ? "is-invalid" : ""}`}
                        rows="6"
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                    />

                    {errors.answer && (
                        <div className="invalid-feedback">
                            {errors.answer}
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Example Code
                    </label>

                    <textarea
                        className="form-control"
                        rows="8"
                        value={exampleCode}
                        onChange={(event) => setExampleCode(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Common Mistakes
                    </label>

                    <textarea
                        className="form-control"
                        rows="4"
                        value={commonMistakes}
                        onChange={(event) => setCommonMistakes(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Follow-up Questions
                    </label>

                    <textarea
                        className="form-control"
                        rows="4"
                        value={followUpQuestions}
                        onChange={(event) => setFollowUpQuestions(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Category
                    </label>

                    <select
                        className="form-select"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        <option value="JAVA">JAVA</option>
                        <option value="SPRING">SPRING</option>
                        <option value="SQL">SQL</option>
                        <option value="HIBERNATE">HIBERNATE</option>
                        <option value="DOCKER">DOCKER</option>
                        <option value="CAMUNDA">CAMUNDA</option>
                        <option value="KAFKA">KAFKA</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Difficulty
                    </label>

                    <select
                        className="form-select"
                        value={difficulty}
                        onChange={(event) => setDifficulty(event.target.value)}
                    >
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>
                </div>

                <div className="form-check mb-3">
                    <input
                        id="published"
                        className="form-check-input"
                        type="checkbox"
                        checked={published}
                        onChange={(event) => setPublished(event.target.checked)}
                    />

                    <label
                        className="form-check-label"
                        htmlFor="published"
                    >
                        Published
                    </label>
                </div>

<button
    type="submit"
    className="btn btn-primary"
    disabled={saving}
>
    {saving ? (
        <>
            <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
            />

            {isEditMode ? "Updating..." : "Saving..."}
        </>
    ) : (
        isEditMode ? "Update Question" : "Save Question"
    )}
</button>

<button
    type="button"
    className="btn btn-secondary ms-2"
    onClick={() => navigate("/admin")}
    disabled={saving}
>
    Cancel
</button>

            </form>
        </div>
    );
}

export default QuestionForm;