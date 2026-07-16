import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const technologies = [
        "Java",
        "Spring Boot",
        "SQL",
        "Hibernate",
        "Docker",
        "Camunda",
        "PostgreSQL",
        "REST APIs"
    ];

    const benefits = [
        {
            number: "01",
            title: "Real interview topics",
            description:
                "Practice Java, Spring Boot, SQL and backend questions organized by category and difficulty."
        },
        {
            number: "02",
            title: "Build your study list",
            description:
                "Save important questions to Favorites and return to them whenever you want to practice."
        },
        {
            number: "03",
            title: "Personal dashboard",
            description:
                "See your saved questions and receive a new practice suggestion from one central place."
        }
    ];

    const steps = [
        {
            number: "1",
            title: "Create your account",
            description:
                "Join the public beta for free. No payment information is required."
        },
        {
            number: "2",
            title: "Choose a topic",
            description:
                "Search and filter questions by category and difficulty."
        },
        {
            number: "3",
            title: "Save important questions",
            description:
                "Create a personal list with the questions you want to review."
        },
        {
            number: "4",
            title: "Continue from Dashboard",
            description:
                "Return to your saved questions and continue practicing."
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
                        <div className="col-12 col-lg-7">
                            <span className="badge text-bg-primary px-3 py-2 mb-3">
                                FREE PUBLIC BETA
                            </span>

                            <h1 className="display-3 fw-bold mb-4">
                                Ace your next{" "}
                                <span className="text-primary">
                                    Java interview
                                </span>
                            </h1>

                            <p className="lead text-white-50 mb-4">
                                Practice real Java backend interview
                                questions, save the important ones and
                                organize your preparation from a personal
                                dashboard.
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
                            <div className="card border-0 shadow-lg">
                                <div className="card-body p-4 p-md-5 text-dark">
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
                                                Browse interview questions
                                            </strong>

                                            <small className="text-secondary">
                                                Search by topic and difficulty
                                            </small>
                                        </div>

                                        <div className="list-group-item px-0 py-3">
                                            <strong className="d-block">
                                                Save your favorites
                                            </strong>

                                            <small className="text-secondary">
                                                Build a personal practice list
                                            </small>
                                        </div>

                                        <div className="list-group-item px-0 py-3">
                                            <strong className="d-block">
                                                Continue practicing
                                            </strong>

                                            <small className="text-secondary">
                                                Receive a random question
                                                suggestion
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
                            CURRENT V1 FEATURES
                        </span>

                        <h2 className="display-6 fw-bold mt-2">
                            Everything you need to start preparing
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
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <span className="badge text-bg-primary mb-3">
                                            {benefit.number}
                                        </span>

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
                        Structured preparation for important Java backend
                        topics.
                    </p>

                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        {technologies.map(technology => (
                            <span
                                key={technology}
                                className="badge rounded-pill text-bg-dark fs-6 px-4 py-3"
                            >
                                {technology}
                            </span>
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
                        Join the free public beta and build your personal
                        interview preparation list.
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

            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
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