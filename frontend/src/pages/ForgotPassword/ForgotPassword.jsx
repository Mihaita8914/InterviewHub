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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h1 className="h3 text-center mb-3">
                                Forgot password?
                            </h1>

                            <p className="text-muted text-center mb-4">
                                Enter your email address and we will send you
                                a link to reset your password.
                            </p>

                            {message && (
                                <div className="alert alert-success">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger">
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
                                        className="form-control"
                                        value={email}
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="you@example.com"
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Sending..."
                                        : "Send reset link"}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <Link to="/login">
                                    Back to login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;