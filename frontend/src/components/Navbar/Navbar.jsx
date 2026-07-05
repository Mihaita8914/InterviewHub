import { Link } from "react-router-dom";

function Navbar() {
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

                    <Link
                        className="nav-link"
                        to="/login"
                    >
                        Login
                    </Link>

                    <Link
                        className="nav-link"
                        to="/admin"
                    >
                        Admin
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;