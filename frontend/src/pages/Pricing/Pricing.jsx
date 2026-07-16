import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Pricing() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const freeFeatures = [
        "Java interview questions and detailed answers",
        "Search by keyword",
        "Category and difficulty filters",
        "Save favorite questions",
        "Personalized user dashboard",
        "Responsive access from desktop and mobile"
    ];

    const futurePlans = [
        {
            name: "Pro",
            description:
                "A structured preparation experience for serious candidates.",
            features: [
                "Progress tracking",
                "Personal notes",
                "Structured learning paths",
                "Advanced practice statistics"
            ]
        },
        {
            name: "Premium",
            description:
                "Advanced guidance and personalized interview preparation.",
            features: [
                "AI answer feedback",
                "Mock interview sessions",
                "Personalized learning plan",
                "Advanced interview insights"
            ]
        }
    ];

    function handleStart() {
        navigate(
            isAuthenticated
                ? "/dashboard"
                : "/register"
        );
    }

    return (
        <main>
            <section className="bg-dark text-white py-5">
                <div className="container py-5 text-center">
                    <span className="badge text-bg-primary px-3 py-2 mb-3">
                        FREE PUBLIC BETA
                    </span>

                    <h1 className="display-4 fw-bold">
                        Prepare smarter for your next Java interview
                    </h1>

                    <p
                        className="lead text-white-50 mx-auto mt-3"
                        style={{ maxWidth: "720px" }}
                    >
                        InterviewHub is currently free during the public
                        beta. Practice real questions, save favorites and
                        organize your preparation.
                    </p>

                    <button
                        type="button"
                        className="btn btn-primary btn-lg px-5 mt-3"
                        onClick={handleStart}
                    >
                        {isAuthenticated
                            ? "Open Dashboard"
                            : "Start Free Beta"}
                    </button>

                    <p className="small text-white-50 mt-3 mb-0">
                        No credit card required.
                    </p>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container py-4">
                    <div
                        className="card border-primary border-2 shadow-sm mx-auto"
                        style={{ maxWidth: "900px" }}
                    >
                        <div className="card-header bg-primary text-white text-center fw-semibold py-3">
                            Everything currently available
                        </div>

                        <div className="card-body p-4 p-md-5">
                            <div className="row align-items-center g-4">
                                <div className="col-12 col-lg-4 text-center text-lg-start">
                                    <h2 className="display-6 fw-bold">
                                        Free Beta
                                    </h2>

                                    <div className="my-3">
                                        <span className="display-4 fw-bold">
                                            €0
                                        </span>
                                    </div>

                                    <p className="text-secondary">
                                        Full access to the current V1
                                        functionality during the public beta.
                                    </p>
                                </div>

                                <div className="col-12 col-lg-8">
                                    <div className="row g-3">
                                        {freeFeatures.map(feature => (
                                            <div
                                                className="col-12 col-md-6"
                                                key={feature}
                                            >
                                                <div className="d-flex gap-2">
                                                    <span className="text-success fw-bold">
                                                        ✓
                                                    </span>

                                                    <span>{feature}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-primary w-100 mt-4"
                                        onClick={handleStart}
                                    >
                                        {isAuthenticated
                                            ? "Continue Learning"
                                            : "Create Free Account"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <span className="badge text-bg-secondary mb-3">
                            PRODUCT ROADMAP
                        </span>

                        <h2 className="fw-bold">
                            More features are planned
                        </h2>

                        <p className="text-secondary">
                            These plans are not available for purchase yet.
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        {futurePlans.map(plan => (
                            <div
                                className="col-12 col-lg-5"
                                key={plan.name}
                            >
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h3 className="h3 fw-bold mb-0">
                                                {plan.name}
                                            </h3>

                                            <span className="badge text-bg-warning">
                                                Coming later
                                            </span>
                                        </div>

                                        <p className="text-secondary">
                                            {plan.description}
                                        </p>

                                        <ul className="list-unstyled mb-0">
                                            {plan.features.map(feature => (
                                                <li
                                                    className="mb-3"
                                                    key={feature}
                                                >
                                                    <span className="text-primary me-2">
                                                        ◦
                                                    </span>

                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-light py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            Frequently asked questions
                        </h2>
                    </div>

                    <div
                        className="accordion mx-auto"
                        id="pricingFaq"
                        style={{ maxWidth: "850px" }}
                    >
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faqBeta"
                                >
                                    Is InterviewHub currently free?
                                </button>
                            </h2>

                            <div
                                id="faqBeta"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#pricingFaq"
                            >
                                <div className="accordion-body">
                                    Yes. All current V1 features are
                                    available free of charge during the
                                    public beta.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faqPayment"
                                >
                                    Do I need to provide payment details?
                                </button>
                            </h2>

                            <div
                                id="faqPayment"
                                className="accordion-collapse collapse"
                                data-bs-parent="#pricingFaq"
                            >
                                <div className="accordion-body">
                                    No. InterviewHub does not currently
                                    request payment or card information.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faqFuture"
                                >
                                    Will paid plans be introduced later?
                                </button>
                            </h2>

                            <div
                                id="faqFuture"
                                className="accordion-collapse collapse"
                                data-bs-parent="#pricingFaq"
                            >
                                <div className="accordion-body">
                                    Potential paid plans will only be
                                    introduced after the planned features
                                    are implemented and clearly described.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-primary text-white py-5">
                <div className="container text-center py-4">
                    <h2 className="display-6 fw-bold">
                        Start preparing today
                    </h2>

                    <p className="lead">
                        Build your interview preparation list and practice
                        from any device.
                    </p>

                    <button
                        type="button"
                        className="btn btn-light btn-lg px-5"
                        onClick={handleStart}
                    >
                        {isAuthenticated
                            ? "Go to Dashboard"
                            : "Join the Free Beta"}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Pricing;