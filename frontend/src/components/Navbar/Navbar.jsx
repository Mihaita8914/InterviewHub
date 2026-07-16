import { Link, NavLink, useNavigate } from "react-router-dom";
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

    function getNavLinkClass({ isActive }) {
        return `nav-link px-3 ${
            isActive ? "active fw-semibold" : ""
        }`;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
            <div className="container">

                <Link
                    className="navbar-brand fw-bold d-flex align-items-center gap-2"
                    to="/"
                >
                    <span
                        className="d-inline-flex align-items-center justify-content-center bg-primary rounded"
                        style={{
                            width: "38px",
                            height: "38px"
                        }}
                    >
                        {"</>"}
                    </span>

                    <span>
                        Interview
                        <span className="text-primary">
                            Hub
                        </span>
                    </span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="mainNavbar"
                >
                    <div className="navbar-nav mx-auto">

                        <NavLink
                            className={getNavLinkClass}
                            to="/"
                        >
                            Home
                        </NavLink>

                        <NavLink
                            className={getNavLinkClass}
                            to="/questions"
                        >
                            Questions
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                className={getNavLinkClass}
                                to="/favorites"
                            >
                                Favorites
                            </NavLink>
                        )}
                        <NavLink
                            className={getNavLinkClass}
                            to="/pricing"
                        >
                            Pricing
                        </NavLink>

                        {/* {isAuthenticated && (
                            <NavLink
                                className={getNavLinkClass}
                                to="/dashboard"
                            >
                                Dashboard
                            </NavLink>
                        )} */}

                        {isAuthenticated && user?.role === "ADMIN" && (
                            <NavLink
                                className={getNavLinkClass}
                                to="/admin"
                            >
                                Admin
                            </NavLink>
                        )}

                    </div>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    className="btn btn-outline-light"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <Link
                                    className="btn btn-primary"
                                    to="/register"
                                >
                                    Start Free
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="text-light me-lg-2">
                                    <small className="text-secondary d-block">
                                        Signed in as
                                    </small>

                                    <span className="fw-semibold">
                                        {user?.name || user?.email || "User"}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;