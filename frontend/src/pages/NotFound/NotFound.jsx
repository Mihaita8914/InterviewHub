import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="bg-light min-vh-100 d-flex align-items-center py-5">
            <div className="container">
                <div className="card border-0 shadow-sm mx-auto">
                    <div className="card-body text-center p-4 p-md-5">
                        <p className="display-1 fw-bold text-primary mb-0">
                            404
                        </p>

                        <h1 className="h2 fw-bold">
                            Page not found
                        </h1>

                        <p className="text-secondary mb-4">
                            The page you are looking for does not exist
                            or may have been moved.
                        </p>

                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                            <Link
                                to="/"
                                className="btn btn-primary"
                            >
                                Go to homepage
                            </Link>

                            <Link
                                to="/questions"
                                className="btn btn-outline-primary"
                            >
                                Browse questions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default NotFound;