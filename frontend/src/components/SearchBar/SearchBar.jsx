function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>
    );
}

export default SearchBar;