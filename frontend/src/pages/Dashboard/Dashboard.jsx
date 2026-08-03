import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFavorites } from "../../api/FavoriteService";
import { getRandomQuestion } from "../../api/QuestionService";


const quickCategories = [
    {
        name: "Java",
        value: "JAVA",
        description: "Core Java, collections and streams"
    },
    {
        name: "Spring",
        value: "SPRING",
        description: "Spring Boot, Security and REST"
    },
    {
        name: "SQL",
        value: "SQL",
        description: "Queries, joins and databases"
    },
    {
        name: "Docker",
        value: "DOCKER",
        description: "Containers, images and deployment"
    },
    {
        name: "Hibernate",
        value: "HIBERNATE",
        description: "JPA, entities and persistence"
    },
    {
        name: "Camunda",
        value: "CAMUNDA",
        description: "Processes, workers and BPMN"
    },
    {
        name: "Kafka",
        value: "KAFKA",
        description: "Events, producers and consumers"
    }
];

function Dashboard() {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [lastPracticedQuestion, setLastPracticedQuestion] = useState(null);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [randomLoading, setRandomLoading] = useState(false);
    const [randomError, setRandomError] = useState("");

useEffect(() => {
    loadDashboard();

    try {
        const savedQuestion = localStorage.getItem(
            "interviewhub:lastPracticedQuestion"
        );

        if (savedQuestion) {
            setLastPracticedQuestion(JSON.parse(savedQuestion));
        }
    } catch (storageError) {
        console.error(
            "The last practiced question could not be read.",
            storageError
        );

        localStorage.removeItem(
            "interviewhub:lastPracticedQuestion"
        );
    }
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
                setRandomError("");
            } else {
                setRandomQuestion(null);
                setRandomError(
                    randomResult.reason?.response?.data?.error ||
                    "The practice question could not be loaded."
                );
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

    async function loadNewRandomQuestion() {
    try {
        setRandomLoading(true);
        setRandomError("");

        const question = await getRandomQuestion();
        setRandomQuestion(question);
    } catch (requestError) {
        setRandomError(
            requestError.response?.data?.error ||
            "A new practice question could not be loaded."
        );
    } finally {
        setRandomLoading(false);
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

                <section className="card border-0 shadow-sm mb-4">
    <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
            <div>
                <h2 className="h4 fw-bold mb-1">
                    Practice by category
                </h2>

                <p className="text-secondary mb-0">
                    Choose a category and start preparing.
                </p>
            </div>

            <Link
                to="/questions"
                className="btn btn-sm btn-outline-primary"
            >
                View all questions
            </Link>
        </div>

        <div className="row g-3">
            {quickCategories.map(category => (
                <div
                    key={category.value}
                    className="col-12 col-sm-6 col-lg-4"
                >
                    <Link
                        to={`/questions?category=${category.value}`}
                        className="card h-100 border text-decoration-none text-dark"
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h3 className="h5 fw-bold mb-0">
                                    {category.name}
                                </h3>

                                <span className="text-primary">
                                    →
                                </span>
                            </div>

                            <p className="small text-secondary mb-0">
                                {category.description}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
</section>

<section className="card border-0 shadow-sm mb-4">
    <div className="card-body p-4">
        <span className="badge text-bg-success mb-3">
            Continue practicing
        </span>

        {lastPracticedQuestion ? (
            <>
                <h2 className="h3 fw-bold">
                    {lastPracticedQuestion.title}
                </h2>

                <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge text-bg-primary">
                        {lastPracticedQuestion.category}
                    </span>

                    {lastPracticedQuestion.topic && (
                        <span className="badge text-bg-info">
                            {lastPracticedQuestion.topic}
                        </span>
                    )}

                    <span className="badge text-bg-secondary">
                        {lastPracticedQuestion.difficulty}
                    </span>
                </div>

                <p className="text-secondary">
                    {lastPracticedQuestion.question}
                </p>

                <Link
                    to={`/questions/${lastPracticedQuestion.id}`}
                    className="btn btn-primary"
                >
                    Continue question
                </Link>
            </>
        ) : (
            <>
                <h2 className="h4 fw-bold">
                    Start your first practice session
                </h2>

                <p className="text-secondary">
                    Open a question and it will appear here the next
                    time you visit your dashboard.
                </p>

                <Link
                    to="/questions"
                    className="btn btn-outline-primary"
                >
                    Browse questions
                </Link>
            </>
        )}
    </div>
</section>

                <div className="row g-4">
                    <section className="col-12 col-lg-7">
    <div className="card h-100 border-0 shadow-sm">
        <div className="card-body p-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-3">
                    <span className="badge text-bg-warning align-self-start">
                        Practice suggestion
                    </span>

                <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={loadNewRandomQuestion}
                    disabled={randomLoading}
                >
                    {randomLoading
                        ? "Loading..."
                        : "New random question"}
                </button>
            </div>

            {randomError && (
                <div className="alert alert-danger" role="alert">
                    {randomError}
                </div>
            )}

            {randomQuestion ? (
                <>
                    <h2 className="h3 fw-bold">
                        {randomQuestion.title}
                    </h2>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <span className="badge text-bg-primary">
                            {randomQuestion.category}
                        </span>

                        {randomQuestion.topic && (
                            <span className="badge text-bg-info">
                                {randomQuestion.topic}
                            </span>
                        )}

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
                !randomError && (
                    <p className="text-secondary mb-0">
                        No practice question is available.
                    </p>
                )
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