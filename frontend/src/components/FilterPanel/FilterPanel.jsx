import { QUESTION_CATEGORIES } from "../../constants/questionCategories";
import { TOPICS_BY_CATEGORY } from "../../constants/questionTopics";


function FilterPanel({
    category,
    topic,
    difficulty,
    onCategoryChange,
    onTopicChange,
    onDifficultyChange
}) {
    const availableTopics = TOPICS_BY_CATEGORY[category] || [];

    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <label className="form-label">
                    Category
                </label>

                <select
                    className="form-select"
                    value={category}
                    onChange={(event) =>
                        onCategoryChange(event.target.value)
                    }
                >
                    <option value="">All Categories</option>
                    {QUESTION_CATEGORIES.map(categoryOption => (
                        <option
                            key={categoryOption.value}
                            value={categoryOption.value}
                        >
                            {categoryOption.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-4">
                <label className="form-label">
                    Topic
                </label>

                <select
                    className="form-select"
                    value={topic}
                    onChange={(event) =>
                        onTopicChange(event.target.value)
                    }
                    disabled={!category}
                >
                    <option value="">
                        {category
                            ? "All Topics"
                            : "Select a category first"}
                    </option>

                    {availableTopics.map((topicOption) => (
                        <option
                            key={topicOption.value}
                            value={topicOption.value}
                        >
                            {topicOption.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-4">
                <label className="form-label">
                    Difficulty
                </label>

                <select
                    className="form-select"
                    value={difficulty}
                    onChange={(event) =>
                        onDifficultyChange(event.target.value)
                    }
                >
                    <option value="">All Difficulties</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
            </div>
        </div>
    );
}

export default FilterPanel;