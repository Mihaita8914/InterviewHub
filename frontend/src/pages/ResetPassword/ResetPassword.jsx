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
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h1 className="h3 text-center mb-3">
                                Reset password
                            </h1>

                            <p className="text-muted text-center mb-4">
                                Choose a new password for your account.
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
                                            className="form-control"
                                            value={newPassword}
                                            onChange={event =>
                                                setNewPassword(event.target.value)
                                            }
                                            minLength={8}
                                            required
                                            disabled={loading || !token}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label
                                            htmlFor="confirmPassword"
                                            className="form-label"
                                        >
                                            Confirm new password
                                        </label>

                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={event =>
                                                setConfirmPassword(
                                                    event.target.value
                                                )
                                            }
                                            minLength={8}
                                            required
                                            disabled={loading || !token}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading || !token}
                                    >
                                        {loading
                                            ? "Resetting..."
                                            : "Reset password"}
                                    </button>
                                </form>
                            )}

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

export default ResetPassword;