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

    function handleSubmit(e) {
        e.preventDefault();

        login({ email, password })
            .then(data => {
                loginUser(data);
                navigate("/questions");
            })
            .catch(() => {
                setError("Invalid email or password");
            });
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>

            <h1 className="mb-4 text-center">Login</h1>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>

            </form>
            <p className="text-center text-muted mt-4">
                Don't have an account?{" "}
                <Link to="/register">
                Create one for free
                </Link>
            </p>
            
        </div>
    );
}

export default Login;