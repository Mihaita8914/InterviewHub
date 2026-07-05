import { useEffect, useState } from "react";
import { getQuestions } from "../../api/QuestionService";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getQuestions({
            page: currentPage,
            size: 5,
            keyword: searchTerm,
            category,
            difficulty
        })
            .then(data => {
                setQuestions(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => console.error(error));
    }, [currentPage, searchTerm, category, difficulty]);

    return (
        <div className="container mt-4">

            <h1 className="mb-4 text-center">
                InterviewHub Questions
            </h1>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <FilterPanel
                category={category}
                difficulty={difficulty}
                onCategoryChange={setCategory}
                onDifficultyChange={setDifficulty}
            />

            {questions.length === 0 && (
                <div className="alert alert-info">
                    No questions found.
                </div>
            )}

            {questions.map(q => (
                <QuestionCard
                    key={q.id}
                    question={q}
                />
            ))}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

        </div>
    );
}

export default Questions;