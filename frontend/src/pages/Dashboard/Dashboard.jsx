import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getFavorites } from "../../api/FavoriteService";
import { getRandomQuestion } from "../../api/QuestionService";
import { QUESTION_CATEGORIES } from "../../constants/questionCategories";
import { getLastPracticedQuestion, getProgressSummary, getCategoryProgress, getContinueQuestionByCategory } from "../../api/ProgressService";


function Dashboard() {
    const { user } = useAuth();

    const [favorites, setFavorites] = useState([]);
    const [lastPracticedQuestion, setLastPracticedQuestion] = useState(null);
    const [progressSummary, setProgressSummary] = useState({
    startedQuestions: 0,
    completedQuestions: 0,
    inProgressQuestions: 0,
    completionPercentage: 0
});
    const [categoryProgress, setCategoryProgress] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [randomLoading, setRandomLoading] = useState(false);
    const [randomError, setRandomError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboard();
    }, []);


async function handleContinueCategory(category) {
    try {
        const progress =
            await getContinueQuestionByCategory(category);

        if (
            progress?.category &&
            progress?.index !== undefined
        ) {
            navigate(
                `/practice?category=${progress.category}&index=${progress.index}`
            );
            return;
        }

        navigate(`/practice?category=${category}`);
    } catch (error) {
        console.error(
            "Continue practice could not be loaded.",
            error
        );

        navigate(`/practice?category=${category}`);
    }
}

    async function loadDashboard() {
        try {
            setLoading(true);
            setError("");

            const [
                favoritesResult,
                randomResult,
                progressSummaryResult,
                lastPracticedResult,
                categoryProgressResult
            ] = await Promise.allSettled([
                getFavorites(),
                getRandomQuestion(),
                getProgressSummary(),
                getLastPracticedQuestion(),
                getCategoryProgress()
            ]);

            if (favoritesResult.status === "rejected") {
                throw favoritesResult.reason;
            }

            setFavorites(favoritesResult.value);

            if (progressSummaryResult.status === "fulfilled") {
                setProgressSummary(progressSummaryResult.value);
            }

            if (lastPracticedResult.status === "fulfilled") {
                setLastPracticedQuestion(
                    lastPracticedResult.value?.question || null
                );
            }

            if (categoryProgressResult.status === "fulfilled") {
                setCategoryProgress(categoryProgressResult.value);
            }

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

    const startedCategories = new Set(
    categoryProgress.map(item => item.category)
);

    const notStartedCategories =
        QUESTION_CATEGORIES.filter(
            category =>
                !startedCategories.has(category.value)
        );

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
                <section className="card border-0 bg-dark text-white shadow-sm rounded-4 overflow-hidden mb-4">
    <div className="card-body p-4 p-md-5">
        <div className="row align-items-center g-4">

            <div className="col-12 col-lg-7">
                <span className="badge text-bg-primary mb-3">
                    YOUR PREPARATION WORKSPACE
                </span>

                <h1 className="display-6 fw-bold mb-3">
                    Welcome back,{" "}
                    {user?.username || "Developer"}!
                </h1>

                <p className="text-white-50 fs-5 mb-4">
                    Keep building confidence for your next
                    Java backend interview.
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

            <div className="col-12 col-lg-5">
                <div className="bg-white bg-opacity-10 rounded-4 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-white-50">
                            Practice completion
                        </span>

                        <strong className="fs-4">
                            {progressSummary.completionPercentage}%
                        </strong>
                    </div>

                    <div
                        className="progress mb-3"
                        style={{ height: "8px" }}
                    >
                        <div
                            className="progress-bar"
                            style={{
                                width: `${progressSummary.completionPercentage}%`
                            }}
                        />
                    </div>

                    <div className="d-flex justify-content-between gap-3">
                        <div>
                            <div className="fw-bold fs-4">
                                {progressSummary.completedQuestions}
                            </div>

                            <small className="text-white-50">
                                Completed
                            </small>
                        </div>

                        <div>
                            <div className="fw-bold fs-4">
                                {progressSummary.inProgressQuestions}
                            </div>

                            <small className="text-white-50">
                                In progress
                            </small>
                        </div>

                        <div>
                            <div className="fw-bold fs-4">
                                {favorites.length}
                            </div>

                            <small className="text-white-50">
                                Saved
                            </small>
                        </div>
                    </div>
                </div>
            </div>

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


                <section className="card border-0 shadow-sm mb-4">
    <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
            <div>
                <h2 className="h4 fw-bold mb-1">
                    Your progress by category
                </h2>

                <p className="text-secondary mb-0">
                    Focus only on the technologies you want to study.
                </p>
            </div>
        </div>

        {categoryProgress.length === 0 ? (
            <div className="text-center py-4">
                <p className="text-secondary mb-3">
                    You have not started any category yet.
                </p>

                <Link
                    to="/questions"
                    className="btn btn-primary"
                >
                    Start practicing
                </Link>
            </div>
        ) : (
            <div className="row g-4">
                {categoryProgress.map(item => (
                    <div
                        key={item.category}
                        className="col-12 col-md-6"
                    >
                        <div className="border rounded p-3 h-100">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h3 className="h6 fw-bold mb-0">
                                    {item.category === "JAVA"
                                        ? "Java Core"
                                        : item.category}
                                </h3>

                                <span className="fw-semibold">
                                    {item.completionPercentage}%
                                </span>
                            </div>

                            <div
                                className="progress mb-2"
                                role="progressbar"
                                aria-valuenow={item.completionPercentage}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                <div
                                    className="progress-bar"
                                    style={{
                                        width: `${item.completionPercentage}%`
                                    }}
                                />
                            </div>

                            <small className="text-secondary">
                                {item.completedQuestions} of{" "}
                                {item.totalQuestions} completed

                                {item.inProgressQuestions > 0 && (
                                    <>
                                        {" · "}
                                        {item.inProgressQuestions} in progress
                                    </>
                                )}
                            </small>

                            <div className="mt-3 d-flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => {
                                    if (item.completionPercentage === 100) {
                                        navigate(
                                            `/practice?category=${item.category}`
                                        );
                                        return;
                                    }

                                    handleContinueCategory(item.category);
                                }}
                            >
                                {item.completionPercentage === 100
                                    ? "Review"
                                    : "Continue"}
                            </button>

                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() =>
                                        navigate(`/practice?category=${item.category}`)
                                    }
                                >
                                    Practice
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
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
                        {lastPracticedQuestion.category === "JAVA"
                            ? "Java Core"
                            : lastPracticedQuestion.category}
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

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                        handleContinueCategory(
                            lastPracticedQuestion.category
                        )
                    }
                >
                    Continue practice
                </button>
            </>
        ) : (
            <>
                <h2 className="h4 fw-bold">
                    Start your first practice session
                </h2>

                <p className="text-secondary">
                    Open a question while logged in and it will appear here.
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

                <section className="card border-0 shadow-sm mb-4">
    <div className="card-body p-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-4">
            <div>
                <h2 className="h4 fw-bold mb-1">
                    Explore new categories
                </h2>

                <p className="text-secondary mb-0">
                    Start practicing technologies you have not explored yet.
                </p>
            </div>

            <Link
                to="/questions"
                className="btn btn-sm btn-outline-primary"
            >
                View all questions
            </Link>
        </div>

        {notStartedCategories.length === 0 ? (
            <div className="text-center py-4">
                <p className="text-secondary mb-0">
                    You have started all available categories.
                </p>
            </div>
        ) : (
            <div className="row g-3">
                {notStartedCategories.map(category => (
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
                                        {category.label}
                                    </h3>

                                    <span className="text-primary">
                                        →
                                    </span>
                                </div>

                                <p className="small text-secondary mb-0">
                                    {category.shortDescription}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
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