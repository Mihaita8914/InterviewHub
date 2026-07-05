function FilterPanel({
    category,
    difficulty,
    onCategoryChange,
    onDifficultyChange
}) {
    return (
        <div className="row mb-4">

            <div className="col-md-6">
                <label className="form-label">Category</label>

                <select
                    className="form-select"
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="JAVA">JAVA</option>
                    <option value="SPRING">SPRING</option>
                    <option value="SQL">SQL</option>
                    <option value="DOCKER">DOCKER</option>
                </select>
            </div>

            <div className="col-md-6">
                <label className="form-label">Difficulty</label>

                <select
                    className="form-select"
                    value={difficulty}
                    onChange={(e) => onDifficultyChange(e.target.value)}
                >
                    <option value="">All Difficulties</option>
                    <option value="EASY">EASY</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HARD">HARD</option>
                </select>
            </div>

        </div>
    );
}

export default FilterPanel;