function parseFollowUps(value) {
    if (!value) {
        return [];
    }

    const blocks = value
        .split(/\n\s*\n/)
        .map(block => block.trim())
        .filter(Boolean);

    return blocks.map(block => {
        const lines = block
            .split(/\r?\n/)
            .map(line => line.trim())
            .filter(Boolean);

        const questionLine =
            lines.find(line => line.startsWith("Q:"));

        const answerLine =
            lines.find(line => line.startsWith("A:"));

        return {
            question: questionLine
                ? questionLine.replace(/^Q:\s*/, "")
                : "",
            answer: answerLine
                ? answerLine.replace(/^A:\s*/, "")
                : ""
        };
    });
}

function FollowUpQuestions({ value }) {
    const followUps = parseFollowUps(value);

    if (followUps.length === 0) {
        return null;
    }

    return (
        <section className="py-3">
            <h3 className="h5 fw-bold mb-3">
                Follow-up Questions
            </h3>

            <div className="d-flex flex-column gap-3">
                {followUps.map((item, index) => (
                    <div
                        key={`${item.question}-${index}`}
                        className="border rounded-4 p-3 p-md-4 bg-light"
                    >
                        <div className="fw-semibold mb-2">
                            {index + 1}. {item.question}
                        </div>

                        {item.answer && (
                            <div className="text-secondary">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FollowUpQuestions;