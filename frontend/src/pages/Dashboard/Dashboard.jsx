import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFavorites } from "../../api/FavoriteService";
import { getRandomQuestion } from "../../api/QuestionService";

function Dashboard() {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const [favoritesResult, randomResult] =
                await Promise.allSettled([
                    getFavorites(),
                    getRandomQuestion()
                ]);

            if (favoritesResult.status === "rejected") {
                throw favoritesResult.reason;
            }

            setFavorites(favoritesResult.value);

            if (randomResult.status === "fulfilled") {
                setRandomQuestion(randomResult.value);
            } else {
                setRandomQuestion(null);
            }
        } catch (requestError) {
            setError(
                requestError.response?.data?.error ||
                "Dashboard data could not be loaded."
            );
        } finally {
            setLoading(false);
        }
    }

    const latestFavorites = favorites.slice(0, 3);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="text-secondary mt-3">
                    Preparing your dashboard...
                </p>
            </div>
        );
    }

    return (
        <main className="bg-light min-vh-100 py-4 py-md-5">
            <div className="container">
                <section className="card border-0 bg-dark text-white shadow-sm mb-4">
                    <div className="card-body p-4 p-md-5">
                        <span className="badge text-bg-primary mb-3">
                            InterviewHub Dashboard
                        </span>

                        <h1 className="display-6 fw-bold">
                            Welcome back,{" "}
                            {user?.username || "Developer"}!
                        </h1>

                        <p className="text-white-50 mb-4">
                            Continue preparing for your next Java
                            interview.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-2">
                            <Link
                                to="/questions"
                                className="btn btn-primary"
                            >
                                Practice questions
                            </Link>

                            <Link
                                to="/favorites"
                                className="btn btn-outline-light"
                            >
                                View favorites
                            </Link>
                        </div>
                    </div>
                </section>

                {error && (
                    <div
                        className="alert alert-danger d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3"
                        role="alert"
                    >
                        <span>{error}</span>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            onClick={loadDashboard}
                        >
                            Try again
                        </button>
                    </div>
                )}

                <section className="row g-3 mb-4">
                    <div className="col-12 col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <p className="text-secondary mb-2">
                                    Saved questions
                                </p>

                                <p className="display-5 fw-bold text-primary mb-0">
                                    {favorites.length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <p className="text-secondary mb-2">
                                    Practice suggestion
                                </p>

                                <p className="h3 fw-bold mb-0">
                                    {randomQuestion
                                        ? "Ready"
                                        : "Unavailable"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <p className="text-secondary mb-2">
                                    Current plan
                                </p>

                                <p className="h3 fw-bold mb-0">
                                    Free Beta
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="row g-4">
                    <section className="col-12 col-lg-7">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <span className="badge text-bg-warning mb-3">
                                    Continue practicing
                                </span>

                                {randomQuestion ? (
                                    <>
                                        <h2 className="h3 fw-bold">
                                            {randomQuestion.title}
                                        </h2>

                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            <span className="badge text-bg-primary">
                                                {randomQuestion.category}
                                            </span>

                                            <span className="badge text-bg-secondary">
                                                {randomQuestion.difficulty}
                                            </span>
                                        </div>

                                        <p className="text-secondary">
                                            {randomQuestion.question}
                                        </p>

                                        <Link
                                            to={`/questions/${randomQuestion.id}`}
                                            className="btn btn-primary"
                                        >
                                            Start practicing
                                        </Link>
                                    </>
                                ) : (
                                    <p className="text-secondary mb-0">
                                        No practice question is available.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="col-12 col-lg-5">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h2 className="h4 fw-bold mb-0">
                                        Recent favorites
                                    </h2>

                                    <Link
                                        to="/favorites"
                                        className="small"
                                    >
                                        View all
                                    </Link>
                                </div>

                                {latestFavorites.length === 0 ? (
                                    <div>
                                        <p className="text-secondary">
                                            You have not saved any questions
                                            yet.
                                        </p>

                                        <Link
                                            to="/questions"
                                            className="btn btn-outline-primary"
                                        >
                                            Find questions
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="list-group list-group-flush">
                                        {latestFavorites.map(favorite => (
                                            <Link
                                                key={favorite.id}
                                                to={`/questions/${favorite.question.id}`}
                                                className="list-group-item list-group-item-action px-0 py-3"
                                            >
                                                <div className="fw-semibold">
                                                    {favorite.question.title}
                                                </div>

                                                <small className="text-secondary">
                                                    {
                                                        favorite.question
                                                            .category
                                                    }
                                                    {" · "}
                                                    {
                                                        favorite.question
                                                            .difficulty
                                                    }
                                                </small>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;