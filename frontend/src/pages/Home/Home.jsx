import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <main>

            {/* HERO */}
            <section className="bg-dark text-white py-5">
                <div className="container py-5">
                    <div className="row align-items-center">

                        <div className="col-lg-7">
                            <span className="badge bg-primary mb-3 px-3 py-2">
                                Built for Java Developers
                            </span>

                            <h1 className="display-3 fw-bold mb-4">
                                Ace Your Next
                                <span className="text-primary"> Java Interview</span>
                            </h1>

                            <p className="lead text-light mb-4">
                                Practice real interview questions for Java,
                                Spring Boot, SQL, Hibernate, Docker and Camunda.
                                Learn faster, gain confidence and get closer to
                                your next job.
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                                <button
                                    className="btn btn-primary btn-lg px-4"
                                    onClick={() => navigate("/questions")}
                                >
                                    Start Practicing Free
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-lg px-4"
                                    onClick={() => navigate("/pricing")}
                                >
                                    View Plans
                                </button>
                            </div>

                            <div className="mt-4 text-light">
                                <span className="me-3">
                                    ✓ No credit card required
                                </span>

                                <span>
                                    ✓ Start in seconds
                                </span>
                            </div>
                        </div>

                        <div className="col-lg-5 mt-5 mt-lg-0">
                            <div className="card border-0 shadow-lg">
                                <div className="card-body p-4 text-dark">

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div>
                                            <small className="text-muted">
                                                Interview progress
                                            </small>

                                            <h4 className="mb-0">
                                                Your Learning Dashboard
                                            </h4>
                                        </div>

                                        <span className="badge bg-success">
                                            Active
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Java Core</span>
                                            <strong>82%</strong>
                                        </div>

                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style={{ width: "82%" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Spring Boot</span>
                                            <strong>64%</strong>
                                        </div>

                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style={{ width: "64%" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>SQL</span>
                                            <strong>48%</strong>
                                        </div>

                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                style={{ width: "48%" }}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        className="btn btn-dark w-100"
                                        onClick={() => navigate("/questions")}
                                    >
                                        Continue Learning
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* BENEFITS */}
            <section className="py-5 bg-light">
                <div className="container py-4">

                    <div className="text-center mb-5">
                        <span className="text-primary fw-bold">
                            EVERYTHING YOU NEED
                        </span>

                        <h2 className="display-6 fw-bold mt-2">
                            Prepare smarter, not harder
                        </h2>

                        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
                            InterviewHub helps you focus on the topics that actually
                            matter in real Java interviews.
                        </p>
                    </div>

                    <div className="row g-4">

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="fs-1 mb-3">
                                        💻
                                    </div>

                                    <h3 className="h4">
                                        Real Interview Questions
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Practice questions inspired by real
                                        technical interviews across Java,
                                        Spring Boot, databases and backend systems.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="fs-1 mb-3">
                                        🎯
                                    </div>

                                    <h3 className="h4">
                                        Focused Learning
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Search and filter questions by category
                                        and difficulty so you can practice exactly
                                        what you need.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="fs-1 mb-3">
                                        🚀
                                    </div>

                                    <h3 className="h4">
                                        Faster Progress
                                    </h3>

                                    <p className="text-muted mb-0">
                                        Build confidence step by step and prepare
                                        for junior, mid-level and senior backend
                                        interviews.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* TECHNOLOGIES */}
            <section className="py-5">
                <div className="container py-4 text-center">

                    <h2 className="fw-bold mb-3">
                        Master the technologies companies ask for
                    </h2>

                    <p className="text-muted mb-4">
                        Structured preparation for the most important backend topics.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {[
                            "Java",
                            "Spring Boot",
                            "SQL",
                            "Hibernate",
                            "Docker",
                            "Camunda",
                            "PostgreSQL",
                            "REST APIs"
                        ].map(technology => (
                            <span
                                key={technology}
                                className="badge rounded-pill bg-dark fs-6 px-4 py-3"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>

                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-bold">
                            HOW IT WORKS
                        </span>

                        <h2 className="display-6 fw-bold mt-2">
                            Four steps to a better interview
                        </h2>
                    </div>

                    <div className="row g-4 text-center">
                        {[
                            ["1", "Choose a topic", "Select Java, Spring, SQL or another backend topic."],
                            ["2", "Practice questions", "Study real questions grouped by difficulty."],
                            ["3", "Learn the answer", "Understand the explanation, examples and common mistakes."],
                            ["4", "Build confidence", "Track your preparation and get ready for the real interview."]
                        ].map(([number, title, text]) => (
                            <div className="col-md-6 col-lg-3" key={number}>
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-body p-4">
                                        <div
                                            className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-4 mb-3"
                                            style={{
                                                width: "55px",
                                                height: "55px"
                                            }}
                                        >
                                            {number}
                                        </div>

                                        <h3 className="h5">
                                            {title}
                                        </h3>

                                        <p className="text-muted mb-0">
                                            {text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5">
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-lg"
                            onClick={() => navigate("/pricing")}
                        >
                            Compare Plans
                        </button>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-primary text-white py-5">
                <div className="container py-4 text-center">

                    <h2 className="display-6 fw-bold">
                        Ready to improve your next interview?
                    </h2>

                    <p className="lead mb-4">
                        Start practicing today and build the confidence
                        you need to get the job.
                    </p>

                    <button
                        className="btn btn-light btn-lg px-5"
                        onClick={() => navigate("/questions")}
                    >
                        Start Practicing
                    </button>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

                        <div>
                            <strong>InterviewHub</strong>
                            <span className="text-secondary ms-2">
                                Java interview preparation
                            </span>
                        </div>

                        <div className="text-secondary">
                            © {new Date().getFullYear()} InterviewHub.
                            All rights reserved.
                        </div>

                    </div>
                </div>
            </footer>

        </main>
    );
}

export default Home;