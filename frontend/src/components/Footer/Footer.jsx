import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="app-footer bg-dark text-light">
            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-5">
                        <Link
                            to="/"
                            className="text-decoration-none text-white d-inline-flex align-items-center gap-2 mb-3"
                        >
                            <span className="footer-logo">
                                {"</>"}
                            </span>

                            <span className="fs-5 fw-bold">
                                Interview<span className="text-primary">Hub</span>
                            </span>
                        </Link>

                        <p className="text-white-50 mb-0 footer-description">
                            Practice smarter for your next Java backend
                            interview. Build confidence, track your progress
                            and focus on the topics that matter.
                        </p>
                    </div>

                    <div className="col-6 col-lg-3">
                        <h2 className="h6 fw-bold mb-3">
                            Product
                        </h2>

                        <div className="d-flex flex-column gap-2">
                            <Link
                                to="/questions"
                                className="footer-link"
                            >
                                Questions
                            </Link>

                            <Link
                                to="/practice"
                                className="footer-link"
                            >
                                Practice
                            </Link>

                            <Link
                                to="/dashboard"
                                className="footer-link"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/pricing"
                                className="footer-link"
                            >
                                Pricing
                            </Link>
                        </div>
                    </div>

                    <div className="col-6 col-lg-4">
                        <h2 className="h6 fw-bold mb-3">
                            Popular topics
                        </h2>

                        <div className="d-flex flex-column gap-2">
                            <Link
                                to="/questions?category=JAVA"
                                className="footer-link"
                            >
                                Java Core
                            </Link>

                            <Link
                                to="/questions?category=SPRING"
                                className="footer-link"
                            >
                                Spring Boot
                            </Link>

                            <Link
                                to="/questions?category=SQL"
                                className="footer-link"
                            >
                                SQL & Databases
                            </Link>

                            <Link
                                to="/questions?category=DOCKER"
                                className="footer-link"
                            >
                                Docker
                            </Link>
                        </div>
                    </div>
                </div>

                <hr className="border-secondary my-4" />

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                    <small className="text-white-50">
                        © 2026 InterviewHub. All rights reserved.
                    </small>

                    <div className="d-flex gap-4">
                        <span className="footer-link small">
                            Privacy
                        </span>

                        <span className="footer-link small">
                            Terms
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;