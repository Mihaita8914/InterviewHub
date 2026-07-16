import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../../api/AuthService";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(currentData => ({
            ...currentData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const username = formData.username.trim();
        const email = formData.email.trim();

        if (!username) {
            setError("Username is required.");
            return;
        }

        if (!email) {
            setError("Email is required.");
            return;
        }

        if (formData.password.length < 6) {
            setError(
                "Password must have at least 6 characters."
            );
            return;
        }

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const authResponse = await register({
                username,
                email,
                password: formData.password
            });

            loginUser(authResponse);
            navigate("/dashboard");
        } catch (requestError) {
            const responseData =
                requestError.response?.data;

            if (responseData?.validationErrors) {
                setError(
                    Object.values(
                        responseData.validationErrors
                    ).join(" ")
                );
            } else if (responseData?.error) {
                setError(responseData.error);
            } else if (responseData?.message) {
                setError(responseData.message);
            } else if (!requestError.response) {
                setError(
                    "The server cannot be reached. Please try again."
                );
            } else {
                setError(
                    "Registration failed. Please try again."
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
                                FREE PUBLIC BETA
                            </span>

                            <h1 className="h2 fw-bold">
                                Create your account
                            </h1>

                            <p className="text-secondary mb-0">
                                Save questions and organize your Java
                                interview preparation.
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
                                    htmlFor="username"
                                    className="form-label"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    minLength={3}
                                    maxLength={50}
                                    autoComplete="username"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="email"
                                    className="form-label"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="password"
                                    className="form-label"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={6}
                                    autoComplete="new-password"
                                    disabled={loading}
                                    required
                                />

                                <div className="form-text">
                                    Minimum 6 characters.
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="confirmPassword"
                                    className="form-label"
                                >
                                    Confirm password
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="form-control"
                                    value={
                                        formData.confirmPassword
                                    }
                                    onChange={handleChange}
                                    minLength={6}
                                    autoComplete="new-password"
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
                                    ? "Creating account..."
                                    : "Create free account"}
                            </button>
                        </form>

                        <p className="text-center text-secondary mt-4 mb-0">
                            Already have an account?{" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;