import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { QUESTION_CATEGORIES } from "../../constants/questionCategories";
import "./Home.css";

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();


    const benefits = [
        {
            number: "01",
            title: "Practice like a real interview",
            description:
                "Think about your answer first, reveal the explanation only when you are ready, and move through focused Java backend practice sessions."
        },
        {
            number: "02",
            title: "Know exactly where you stand",
            description:
                "Track completed questions, category progress and unfinished topics from your personal dashboard."
        },
        {
            number: "03",
            title: "Continue exactly where you stopped",
            description:
                "Resume unfinished practice sessions, review completed categories and save important questions for later."
        }
    ];

        const steps = [
            {
                number: "1",
                title: "Choose what to study",
                description:
                    "Filter Java backend questions by technology, topic and difficulty."
            },
            {
                number: "2",
                title: "Enter Practice Mode",
                description:
                    "Answer the question yourself before revealing the prepared explanation."
            },
            {
                number: "3",
                title: "Track your progress",
                description:
                    "Mark questions as completed and see your real progress across each category."
            },
            {
                number: "4",
                title: "Continue or review",
                description:
                    "Resume unfinished learning exactly where you stopped or review completed categories."
            }
        ];

    function handlePrimaryAction() {
        navigate(
            isAuthenticated
                ? "/dashboard"
                : "/register"
        );
    }

    return (
        <main>
            <section className="bg-dark text-white py-5">
                <div className="container py-4 py-md-5">
                    <div className="row align-items-center g-5">
                        <div className="col-12 col-lg-7 pe-lg-5">
                            <span className="badge text-bg-primary px-3 py-2 mb-3">
                                FREE PUBLIC BETA
                            </span>

                                <h1
                                   className="display-3 fw-bold mb-4"
                                   style={{ maxWidth: "760px" }}
                                >
                                Prepare smarter for your next{" "}
                                <span className="text-primary">
                                    Java backend interview
                                </span>
                            </h1>

                            <p className="lead text-white-50 mb-4" style={{ maxWidth: "680px" }}>
                                Practice Java, Spring, SQL and backend interview
                                questions in focused sessions, track your progress
                                and continue exactly where you left off.
                            </p>

                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg px-4"
                                    onClick={handlePrimaryAction}
                                >
                                    {isAuthenticated
                                        ? "Open Dashboard"
                                        : "Create Free Account"}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-light btn-lg px-4"
                                    onClick={() =>
                                        navigate("/questions")
                                    }
                                >
                                    Explore Questions
                                </button>
                            </div>

                            <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-4 mt-4 text-white-50">
                                <span>✓ No credit card required</span>
                                <span>✓ Works on mobile and desktop</span>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <div className="card border-0 shadow-lg rounded-4">
                                <div className="card-body p-4 text-dark">
                                    <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                                        <div>
                                            <small className="text-secondary">
                                                Your preparation workspace
                                            </small>

                                            <h2 className="h4 fw-bold mt-1 mb-0">
                                                InterviewHub Dashboard
                                            </h2>
                                        </div>

                                        <span className="badge text-bg-success">
                                            Available
                                        </span>
                                    </div>

                                    <div className="list-group list-group-flush">
                                    <div className="list-group-item px-0 py-3">
                                        <strong className="d-block">
                                            Focused Practice Mode
                                        </strong>

                                        <small className="text-secondary">
                                            Think first, then reveal the answer
                                        </small>
                                    </div>

                                    <div className="list-group-item px-0 py-3">
                                        <strong className="d-block">
                                            Track real progress
                                        </strong>

                                        <small className="text-secondary">
                                            See completion by technology and category
                                        </small>
                                    </div>

                                    <div className="list-group-item px-0 py-3">
                                        <strong className="d-block">
                                            Continue where you stopped
                                        </strong>

                                        <small className="text-secondary">
                                            Resume unfinished practice at the right question
                                        </small>
                                    </div>
                                </div>

                                    <button
                                        type="button"
                                        className="btn btn-dark w-100 mt-4"
                                        onClick={handlePrimaryAction}
                                    >
                                        {isAuthenticated
                                            ? "Continue Learning"
                                            : "Start Free"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-bold">
                            BUILT FOR INTERVIEW PREPARATION
                        </span>

                        <h2 className="display-6 fw-bold mt-2">
                            A focused way to prepare, practice and improve
                        </h2>

                        <p
                            className="text-secondary mx-auto"
                            style={{ maxWidth: "700px" }}
                        >
                            Focus on useful interview content and keep
                            your preparation organized.
                        </p>
                    </div>

                    <div className="row g-4">
                        {benefits.map(benefit => (
                            <div
                                className="col-12 col-md-4"
                                key={benefit.number}
                            >
                                <div className="card h-100 border-0 shadow-sm rounded-4">
                                    <div className="card-body p-4">
                                    <div
                                        className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold mb-4"
                                        style={{
                                            width: "44px",
                                            height: "44px"
                                        }}
                                    >
                                        {benefit.number}
                                    </div>

                                        <h3 className="h4 fw-bold">
                                            {benefit.title}
                                        </h3>

                                        <p className="text-secondary mb-0">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container py-4 text-center">
                    <h2 className="fw-bold mb-3">
                        Practice the technologies companies ask about
                    </h2>

                    <p className="text-secondary mb-4">
                        Choose a category and start practicing the topics
                        commonly discussed in Java backend interviews.
                    </p>

                    <div className="row g-3 justify-content-center">
                        {QUESTION_CATEGORIES.map(category => (
                            <div
                                key={category.value}
                                className="col-12 col-sm-6 col-lg-4"
                            >
                                <button
                                    type="button"
                                    className="card h-100 w-100 border-0 shadow-sm text-start category-card"
                                    onClick={() =>
                                        navigate(
                                            `/questions?category=${category.value}`
                                        )
                                    }
                                >
                                    <div className="card-body p-4 p-lg-5">
                                        <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                                            <h3 className="h5 fw-bold mb-0">
                                                {category.label}
                                            </h3>

                                            <span className="text-primary fw-bold">
                                                →
                                            </span>
                                        </div>

                                        <p className="text-secondary small mb-0">
                                            {category.shortDescription}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="text-primary fw-bold">
                            HOW IT WORKS
                        </span>

                        <h2 className="display-6 fw-bold mt-2">
                            Start preparing in four simple steps
                        </h2>
                    </div>

                    <div className="row g-4">
                        {steps.map(step => (
                            <div
                                className="col-12 col-md-6 col-lg-3"
                                key={step.number}
                            >
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div
                                            className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold fs-5 mb-3"
                                            style={{
                                                width: "48px",
                                                height: "48px"
                                            }}
                                        >
                                            {step.number}
                                        </div>

                                        <h3 className="h5 fw-bold">
                                            {step.title}
                                        </h3>

                                        <p className="text-secondary mb-0">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-primary text-white py-5">
                <div className="container text-center py-4">
                    <h2 className="display-6 fw-bold">
                        Ready to start preparing?
                    </h2>

                    <p className="lead mb-4">
                            Practice real interview questions, track your progress
                            and build confidence for your next Java backend interview.
                    </p>

                    <button
                        type="button"
                        className="btn btn-light btn-lg px-5"
                        onClick={handlePrimaryAction}
                    >
                        {isAuthenticated
                            ? "Go to Dashboard"
                            : "Join Free Beta"}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Home;