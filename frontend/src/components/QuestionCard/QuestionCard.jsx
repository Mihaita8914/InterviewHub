function QuestionCard({ question }) {
    return (
        <div className="card mb-3 shadow-sm">

            <div className="card-body">

                <h3 className="card-title">
                    {question.title}
                </h3>

                <span className="badge bg-primary me-2">
                    {question.category}
                </span>

                <span className="badge bg-warning text-dark">
                    {question.difficulty}
                </span>

                <hr />

                <h5>Question</h5>

                <p>{question.question}</p>

                <h5>Answer</h5>

                <p>{question.answer}</p>

            </div>

        </div>
    );
}

export default QuestionCard;