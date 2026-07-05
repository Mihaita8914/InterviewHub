import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionById } from "../../api/QuestionService";

function QuestionDetails() {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        getQuestionById(id)
            .then(data => setQuestion(data))
            .catch(error => console.error(error));
    }, [id]);

    if (!question) {
        return (
            <div className="container mt-4">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1>{question.title}</h1>

            <span className="badge bg-primary me-2">
                {question.category}
            </span>

            <span className="badge bg-warning text-dark">
                {question.difficulty}
            </span>

            <hr />

            <h4>Question</h4>
            <p>{question.question}</p>

            <h4>Answer</h4>
            <p>{question.answer}</p>
        </div>
    );
}

export default QuestionDetails;