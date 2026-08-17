import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../api/AuthService";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!token) {
            setError("The password reset link is invalid.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        resetPassword(token, newPassword)
            .then(data => {
                setMessage(data);
                setNewPassword("");
                setConfirmPassword("");
            })
            .catch(error => {
                setError(
                    error.response?.data?.message ||
                    "The password reset link is invalid or has expired."
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
                                    PASSWORD RESET
                                </span>

                                <h1 className="h2 fw-bold mb-2">
                                    Choose a new password
                                </h1>

                                <p className="text-secondary mb-0">
                                    Enter a new password for your InterviewHub account.
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

                            {!message && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="newPassword"
                                            className="form-label"
                                        >
                                            New password
                                        </label>

                                        <input
                                            id="newPassword"
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={newPassword}
                                            onChange={event =>
                                                setNewPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter a new password"
                                            minLength={8}
                                            autoComplete="new-password"
                                            required
                                            disabled={loading || !token}
                                        />

                                        <div className="form-text">
                                            Minimum 8 characters.
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="form-label"
                                        >
                                            Confirm new password
                                        </label>

                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            className="form-control form-control-lg"
                                            value={confirmPassword}
                                            onChange={event =>
                                                setConfirmPassword(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Repeat your new password"
                                            minLength={8}
                                            autoComplete="new-password"
                                            required
                                            disabled={loading || !token}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100"
                                        disabled={loading || !token}
                                    >
                                        {loading
                                            ? "Resetting..."
                                            : "Reset password"}
                                    </button>
                                </form>
                            )}

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

export default ResetPassword;