import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/AuthService";
import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            const authResponse = await login({
                email: email.trim(),
                password
            });

            loginUser(authResponse);
            navigate("/dashboard");
        } catch (requestError) {
            const status = requestError.response?.status;
            const responseData = requestError.response?.data;

            if (status === 401 || status === 403) {
                setError("Invalid email or password.");
            } else if (!requestError.response) {
                setError(
                    "The server cannot be reached. Please try again."
                );
            } else {
                setError(
                    responseData?.error ||
                    responseData?.message ||
                    "Login failed. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="bg-light min-vh-100 py-5">
            <div
                className="container"
                style={{ maxWidth: "520px" }}
            >
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 p-md-5">
                        <div className="text-center mb-4">
                            <span className="badge text-bg-primary mb-3">
                                WELCOME BACK
                            </span>

                            <h1 className="h2 fw-bold">
                                Login to InterviewHub
                            </h1>

                            <p className="text-secondary mb-0">
                                Continue your Java interview preparation.
                            </p>
                        </div>

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
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    autoComplete="email"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="small text-decoration-none"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                                <input
                                    id="password"
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    autoComplete="current-password"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 py-2"
                                disabled={loading}
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>
                        </form>

                        <p className="text-center text-secondary mt-4 mb-0">
                            Don&apos;t have an account?{" "}
                            <Link to="/register">
                                Create one for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;