import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    getFavorites,
    removeFavorite
} from "../../api/FavoriteService";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {
        loadFavorites();
    }, []);

    async function loadFavorites() {
        try {
            setLoading(true);
            setError("");

            const data = await getFavorites();
            setFavorites(data);
        } catch (requestError) {
            setError(
                requestError.response?.data?.error ||
                "Favorites could not be loaded."
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleRemove(questionId) {
        try {
            setRemovingId(questionId);
            setError("");

            await removeFavorite(questionId);

            setFavorites(currentFavorites =>
                currentFavorites.filter(
                    favorite =>
                        favorite.question.id !== questionId
                )
            );
        } catch (requestError) {
            setError(
                requestError.response?.data?.error ||
                "The question could not be removed."
            );
        } finally {
            setRemovingId(null);
        }
    }

    return (
        <main className="bg-light min-vh-100 py-4 py-md-5">
            <div className="container">
                <section className="mb-4 mb-md-5">
                    <div className="d-flex flex-column flex-md-row align-items-md-end justify-content-between gap-3">
                        <div>
                            <span className="badge text-bg-primary mb-2">
                                Your learning list
                            </span>

                            <h1 className="fw-bold mb-2">
                                Favorite questions
                            </h1>

                            <p className="text-secondary mb-0">
                                Save important questions and return to them
                                whenever you want to practice.
                            </p>
                        </div>

                        <Link
                            to="/questions"
                            className="btn btn-primary"
                        >
                            Browse questions
                        </Link>
                    </div>
                </section>

                {error && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center py-5">
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>

                        <p className="text-secondary mt-3">
                            Loading your favorites...
                        </p>
                    </div>
                )}

                {!loading && favorites.length === 0 && (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center p-4 p-md-5">
                            <div
                                className="display-4 text-primary mb-3"
                                aria-hidden="true"
                            >
                                ♡
                            </div>

                            <h2 className="h4 fw-bold">
                                No favorite questions yet
                            </h2>

                            <p className="text-secondary">
                                Explore the questions and save the ones
                                you want to practice later.
                            </p>

                            <Link
                                to="/questions"
                                className="btn btn-primary"
                            >
                                Explore questions
                            </Link>
                        </div>
                    </div>
                )}

                {!loading && favorites.length > 0 && (
                    <div className="row g-4">
                        {favorites.map(favorite => {
                            const question = favorite.question;
                            const isRemoving =
                                removingId === question.id;

                            return (
                                <div
                                    className="col-12 col-lg-6"
                                    key={favorite.id}
                                >
                                    <article className="card h-100 border-0 shadow-sm">
                                        <div className="card-body d-flex flex-column p-4">
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                <span className="badge text-bg-primary">
                                                    {question.category}
                                                </span>

                                                <span className="badge text-bg-warning">
                                                    {question.difficulty}
                                                </span>
                                            </div>

                                            <h2 className="h4 fw-bold">
                                                {question.title}
                                            </h2>

                                            <p className="text-secondary flex-grow-1">
                                                {question.question}
                                            </p>

                                            <small className="text-secondary mb-3">
                                                Saved on{" "}
                                                {new Date(
                                                    favorite.createdAt
                                                ).toLocaleDateString()}
                                            </small>

                                            <div className="d-flex flex-column flex-sm-row gap-2">
                                                <Link
                                                    to={`/questions/${question.id}`}
                                                    className="btn btn-primary flex-grow-1"
                                                >
                                                    View question
                                                </Link>

                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    disabled={isRemoving}
                                                    onClick={() =>
                                                        handleRemove(
                                                            question.id
                                                        )
                                                    }
                                                >
                                                    {isRemoving
                                                        ? "Removing..."
                                                        : "Remove"}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Favorites;