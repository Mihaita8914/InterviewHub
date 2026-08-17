import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/AuthService";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        forgotPassword(email)
            .then(data => {
                setMessage(data);
                setEmail("");
            })
            .catch(() => {
                setError(
                    "We could not process your request. Please try again."
                );
            })
            .finally(() => setLoading(false));
    }

return (
    <main className="bg-light min-vh-100 py-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4 p-md-5">

                            <div className="text-center mb-4">
                                <span className="badge text-bg-primary mb-3">
                                    PASSWORD RECOVERY
                                </span>

                                <h1 className="h2 fw-bold mb-2">
                                    Forgot your password?
                                </h1>

                                <p className="text-secondary mb-0">
                                    Enter your email address and we&apos;ll
                                    send you a secure link to choose a new
                                    password.
                                </p>
                            </div>

                            {message && (
                                <div
                                    className="alert alert-success"
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send reset link"}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <Link
                                    to="/login"
                                    className="text-decoration-none"
                                >
                                    ← Back to login
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
);
}

export default ForgotPassword;