import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "../../components/Common/RichTextEditor";

import {
    createQuestion,
    getAdminQuestionById,
    updateQuestion
} from "../../api/QuestionService";

const TOPICS_BY_CATEGORY = {
    JAVA: [
        { value: "OOP", label: "OOP" },
        { value: "STRINGS", label: "Strings" },
        { value: "COLLECTIONS", label: "Collections" },
        { value: "GENERICS", label: "Generics" },
        { value: "EXCEPTIONS", label: "Exceptions" },
        { value: "STREAMS_AND_LAMBDAS", label: "Streams & Lambdas" },
        { value: "MULTITHREADING", label: "Multithreading" },
        { value: "JVM_AND_MEMORY", label: "JVM & Memory" },
        { value: "SOLID", label: "SOLID" },
        { value: "DESIGN_PATTERNS", label: "Design Patterns" }
    ],

    SPRING: [
        { value: "SPRING_CORE", label: "Spring Core" },
        { value: "SPRING_BOOT", label: "Spring Boot" },
        { value: "REST_API", label: "REST API" },
        { value: "SPRING_SECURITY", label: "Spring Security" },
        { value: "SPRING_DATA_JPA", label: "Spring Data JPA" },
        { value: "MICROSERVICES", label: "Microservices" },
        { value: "INTEGRATION_TESTING", label: "Integration Testing" }
    ],

    SQL: [
        { value: "SQL_BASICS", label: "SQL Basics" },
        { value: "JOINS", label: "Joins" },
        { value: "TRANSACTIONS", label: "Transactions" },
        { value: "INDEXES", label: "Indexes" }
    ],

    HIBERNATE: [
        { value: "SPRING_DATA_JPA", label: "JPA & Hibernate" },
        { value: "TRANSACTIONS", label: "Transactions" }
    ],

    DOCKER: [
        { value: "DOCKER", label: "Docker" }
    ],

    KAFKA: [
        { value: "KAFKA", label: "Kafka" }
    ],

    DESIGN_PATTERNS: [
        { value: "DESIGN PATTERNS", label: "DESIGN PATTERNS" }
    ],
    CAMUNDA: [
        { value: "CAMUNDA", label: "Camunda" }
    ]
};

function QuestionForm() {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [category, setCategory] = useState("JAVA");
    const [topic, setTopic] = useState("OOP");;
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

        getAdminQuestionById(id)
            .then(data => {
                setTitle(data.title || "");
                setQuestion(data.question || "");
                setAnswer(data.answer || "");
                setCategory(data.category || "JAVA");
                setTopic(data.topic || "GENERAL");
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
            topic,
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

                    <RichTextEditor
                        value={answer}
                        onChange={setAnswer}
                        hasError={Boolean(errors.answer)}
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
                        onChange={(event) => {
                            const selectedCategory = event.target.value;
                            const availableTopics =
                                TOPICS_BY_CATEGORY[selectedCategory] || [];

                            setCategory(selectedCategory);
                            setTopic(
                                availableTopics.length > 0
                                    ? availableTopics[0].value
                                    : "GENERAL"
                            );
                        }}
                    >
                        <option value="JAVA">JAVA CORE</option>
                        <option value="SPRING">SPRING</option>
                        <option value="SQL">SQL</option>
                        <option value="HIBERNATE">HIBERNATE</option>
                        <option value="DOCKER">DOCKER</option>
                        <option value="CAMUNDA">CAMUNDA</option>
                        <option value="KAFKA">KAFKA</option>
                        <option value="DESIGN_PATTERNS">DESIGN PATTERNS</option>
                    </select>
                </div>

                <div className="mb-3">
    <label className="form-label">Topic</label>

    <select
        className="form-select"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
    >
        {(TOPICS_BY_CATEGORY[category] || []).map(
            (topicOption) => (
                <option
                    key={topicOption.value}
                    value={topicOption.value}
                >
                    {topicOption.label}
                </option>
            )
        )}
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