import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";
import { useTranslation } from "react-i18next";

function Navbar() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        logoutUser
    } = useAuth();

    function changeLanguage(language) {
        i18n.changeLanguage(language);

        localStorage.setItem(
            "interviewhub-language",
            language
        );
    }

    function handleLogout() {
        logoutUser();
        navigate("/");
    }

    function getNavLinkClass({ isActive }) {
        return `nav-link px-3 position-relative ${
            isActive
                ? "active fw-semibold text-white"
                : "text-white-50"
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
                        className="d-inline-flex align-items-center justify-content-center bg-primary rounded-3 fw-bold"
                        style={{
                            width: "40px",
                            height: "40px",
                            fontSize: "14px"
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
                            {t("nav.home")}
                        </NavLink>

                        <NavLink
                            className={getNavLinkClass}
                            to="/questions"
                        >
                            {t("nav.questions")}
                        </NavLink>
                        {isAuthenticated && (
                            <NavLink
                                className={getNavLinkClass}
                                to="/favorites"
                            >
                                {t("nav.favorites")}
                            </NavLink>
                        )}

                        <NavLink
                            className={getNavLinkClass}
                            to="/pricing"
                        >
                            {t("nav.pricing")}
                        </NavLink>

                        {isAuthenticated && (
                            <NavLink
                                className={getNavLinkClass}
                                to="/dashboard"
                            >
                                {t("nav.dashboard")}
                            </NavLink>
                        )}

                        {isAuthenticated && user?.role === "ADMIN" && (
                            <NavLink
                                className={getNavLinkClass}
                                to="/admin"
                            >
                                {t("nav.admin")}
                            </NavLink>
                        )}
                    </div>

                <div className="me-lg-3 my-3 my-lg-0">
                    <div className="btn-group btn-group-sm">
                        <button
                            type="button"
                            className={
                                i18n.language === "en"
                                    ? "btn btn-primary"
                                    : "btn btn-outline-light"
                            }
                            onClick={() => changeLanguage("en")}
                        >
                            EN
                        </button>

                        <button
                            type="button"
                            className={
                                i18n.language === "ro"
                                    ? "btn btn-primary"
                                    : "btn btn-outline-light"
                            }
                            onClick={() => changeLanguage("ro")}
                        >
                            RO
                        </button>
                    </div>
            </div>

                    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    className="btn btn-outline-light"
                                    to="/login"
                                >
                                    {t("nav.login")}
                                </Link>

                                <Link
                                    className="btn btn-primary"
                                    to="/register"
                                >
                                    {t("nav.startFree")}
                                </Link>
                            </>
                        ) : (
                            <>
                                <div className="d-flex align-items-center gap-2 text-light me-lg-2">
                                    <div
                                        className="rounded-circle bg-primary d-flex align-items-center justify-content-center fw-bold"
                                        style={{
                                            width: "36px",
                                            height: "36px"
                                        }}
                                    >
                                        {(user?.username || user?.email || "U")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <span className="fw-semibold">
                                        {user?.username || user?.email || "User"}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    {t("nav.logout")}
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