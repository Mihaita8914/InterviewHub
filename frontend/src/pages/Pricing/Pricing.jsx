import { useNavigate } from "react-router-dom";

function Pricing() {
    const navigate = useNavigate();

    const plans = [
        {
            name: "Free",
            price: "€0",
            description: "Pentru cei care vor să înceapă pregătirea.",
            features: [
                "Acces la întrebările gratuite",
                "Search și filtre",
                "Java Core",
                "Explicații de bază"
            ],
            buttonText: "Start Free",
            buttonClass: "btn-outline-primary",
            action: () => navigate("/questions"),
            recommended: false
        },
        {
            name: "Pro",
            price: "€9.99",
            description: "Pentru pregătire serioasă și progres rapid.",
            features: [
                "Acces nelimitat la întrebări",
                "Conținut premium",
                "Mock interviews",
                "Progress tracking",
                "Favorites și notes",
                "Roadmaps de învățare"
            ],
            buttonText: "Upgrade to Pro",
            buttonClass: "btn-primary",
            action: () => navigate("/login"),
            recommended: true
        },
        {
            name: "Premium",
            price: "€19.99",
            description: "Pentru candidații care vor suport complet.",
            features: [
                "Tot ce include Pro",
                "AI Interview Coach",
                "Feedback pe răspunsuri",
                "Simulări nelimitate",
                "Plan personalizat de învățare",
                "Priority support"
            ],
            buttonText: "Choose Premium",
            buttonClass: "btn-dark",
            action: () => navigate("/login"),
            recommended: false
        }
    ];

    const comparisonRows = [
        ["Interview questions", "Limited", "Unlimited", "Unlimited"],
        ["Search and filters", "Yes", "Yes", "Yes"],
        ["Premium explanations", "No", "Yes", "Yes"],
        ["Mock interviews", "No", "Yes", "Unlimited"],
        ["Progress tracking", "No", "Yes", "Yes"],
        ["Favorites and notes", "No", "Yes", "Yes"],
        ["AI feedback", "No", "No", "Yes"],
        ["Personal roadmap", "No", "No", "Yes"]
    ];

    return (
        <main>
            <section className="bg-dark text-white py-5">
                <div className="container py-5 text-center">
                    <span className="badge bg-primary px-3 py-2 mb-3">
                        SIMPLE PRICING
                    </span>

                    <h1 className="display-4 fw-bold">
                        Choose the plan that gets you hired
                    </h1>

                    <p
                        className="lead text-light mx-auto mt-3"
                        style={{ maxWidth: "720px" }}
                    >
                        Start free, practice real interview questions and upgrade
                        when you are ready for advanced preparation.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-light">
                <div className="container py-4">
                    <div className="row g-4 justify-content-center">
                        {plans.map(plan => (
                            <div className="col-lg-4" key={plan.name}>
                                <div
                                    className={`card h-100 shadow-sm ${
                                        plan.recommended
                                            ? "border-primary border-2"
                                            : "border-0"
                                    }`}
                                >
                                    {plan.recommended && (
                                        <div className="card-header bg-primary text-white text-center fw-semibold">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="card-body p-4 d-flex flex-column">
                                        <h2 className="h3">{plan.name}</h2>

                                        <p className="text-muted">
                                            {plan.description}
                                        </p>

                                        <div className="my-4">
                                            <span className="display-5 fw-bold">
                                                {plan.price}
                                            </span>

                                            <span className="text-muted">
                                                /month
                                            </span>
                                        </div>

                                        <ul className="list-unstyled flex-grow-1">
                                            {plan.features.map(feature => (
                                                <li
                                                    className="mb-3"
                                                    key={feature}
                                                >
                                                    <span className="text-success me-2">
                                                        ✓
                                                    </span>

                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>

                                        <button
                                            type="button"
                                            className={`btn ${plan.buttonClass} w-100 mt-3`}
                                            onClick={plan.action}
                                        >
                                            {plan.buttonText}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container py-4">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">
                            Compare all features
                        </h2>

                        <p className="text-muted">
                            Vezi exact ce primești în fiecare abonament.
                        </p>
                    </div>

                    <div className="table-responsive shadow-sm rounded">
                        <table className="table table-bordered align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Feature</th>
                                    <th className="text-center">Free</th>
                                    <th className="text-center">Pro</th>
                                    <th className="text-center">Premium</th>
                                </tr>
                            </thead>

                            <tbody>
                                {comparisonRows.map(row => (
                                    <tr key={row[0]}>
                                        <td className="fw-semibold">
                                            {row[0]}
                                        </td>

                                        <td className="text-center">
                                            {row[1]}
                                        </td>

                                        <td className="text-center">
                                            {row[2]}
                                        </td>

                                        <td className="text-center">
                                            {row[3]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="py-5 bg-light">
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
                                    data-bs-target="#faqOne"
                                >
                                    Pot începe gratuit?
                                </button>
                            </h2>

                            <div
                                id="faqOne"
                                className="accordion-collapse collapse show"
                                data-bs-parent="#pricingFaq"
                            >
                                <div className="accordion-body">
                                    Da. Planul Free îți permite să testezi aplicația
                                    și să studiezi o selecție de întrebări.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faqTwo"
                                >
                                    Pot anula abonamentul?
                                </button>
                            </h2>

                            <div
                                id="faqTwo"
                                className="accordion-collapse collapse"
                                data-bs-parent="#pricingFaq"
                            >
                                <div className="accordion-body">
                                    Da. Abonamentul va putea fi anulat oricând,
                                    fără perioadă minimă contractuală.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#faqThree"
                                >
                                    Care este diferența dintre Pro și Premium?
                                </button>
                            </h2>

                            <div
                                id="faqThree"
                                className="accordion-collapse collapse"
                                data-bs-parent="#pricingFaq"
                            >
                                <div className="accordion-body">
                                    Pro oferă acces la conținutul și funcțiile
                                    avansate, iar Premium va include AI Coach,
                                    feedback și planuri personalizate.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-primary text-white py-5">
                <div className="container text-center py-4">
                    <h2 className="display-6 fw-bold">
                        Start preparing for your next interview
                    </h2>

                    <p className="lead">
                        Începe gratuit și fă upgrade când ai nevoie de mai mult.
                    </p>

                    <button
                        type="button"
                        className="btn btn-light btn-lg px-5"
                        onClick={() => navigate("/questions")}
                    >
                        Start Free
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Pricing;