import { useEffect, useState } from "react";
import { getQuestions } from "../../api/QuestionService";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    useEffect(() => {
        getQuestions()
.then(data => {
    console.log(data.content);
    setQuestions(data.content);
})
            .catch(error => console.error(error));
    }, []);

    const filteredQuestions = questions.filter(q => {
        const matchesSearch =
            q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.difficulty.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            category === "" || q.category === category;

        const matchesDifficulty =
            difficulty === "" || q.difficulty === difficulty;

        return matchesSearch && matchesCategory && matchesDifficulty;
    });

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

            {filteredQuestions.length === 0 && (
                <div className="alert alert-info">
                    No questions found.
                </div>
            )}

            {filteredQuestions.map(q => (
                <QuestionCard
                    key={q.id}
                    question={q}
                />
            ))}

        </div>
    );
}

export default Questions;