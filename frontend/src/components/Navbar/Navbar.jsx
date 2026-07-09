import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        logoutUser
    } = useAuth();

    function handleLogout() {
        logoutUser();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    InterviewHub
                </Link>

                <div className="navbar-nav">

                    <Link
                        className="nav-link"
                        to="/questions"
                    >
                        Questions
                    </Link>

                    {!isAuthenticated && (
                        <Link
                            className="nav-link"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}

                    {isAuthenticated && (
                        <>
                            {user?.role === "ADMIN" && (
                                <Link
                                    className="nav-link"
                                    to="/admin"
                                >
                                    Admin
                                </Link>
                            )}

                            <button
                                className="btn btn-link nav-link"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;