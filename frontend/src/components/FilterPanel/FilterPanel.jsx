import { QUESTION_CATEGORIES } from "../../constants/questionCategories";


const TOPICS_BY_CATEGORY = {
    JAVA: [
        { value: "OOP", label: "OOP" },
        { value: "STRINGS", label: "Strings" },
        { value: "COLLECTIONS", label: "Collections" },
        { value: "GENERICS", label: "Generics" },
        { value: "EXCEPTIONS", label: "Exceptions" },
        {
            value: "STREAMS_AND_LAMBDAS",
            label: "Streams & Lambdas"
        },
        {
            value: "MULTITHREADING",
            label: "Multithreading"
        },
        {
            value: "JVM_AND_MEMORY",
            label: "JVM & Memory"
        },
        { value: "SOLID", label: "SOLID" },
        {
            value: "DESIGN_PATTERNS",
            label: "Design Patterns"
        }
    ],

    SPRING: [
        { value: "SPRING_CORE", label: "Spring Core" },
        { value: "SPRING_BOOT", label: "Spring Boot" },
        { value: "REST_API", label: "REST API" },
        {
            value: "SPRING_SECURITY",
            label: "Spring Security"
        },
        {
            value: "SPRING_DATA_JPA",
            label: "Spring Data JPA"
        },
        {
            value: "MICROSERVICES",
            label: "Microservices"
        },
        {
            value: "INTEGRATION_TESTING",
            label: "Integration Testing"
        }
    ],

    SQL: [
        { value: "SQL_BASICS", label: "SQL Basics" },
        { value: "JOINS", label: "Joins" },
        {
            value: "TRANSACTIONS",
            label: "Transactions"
        },
        { value: "INDEXES", label: "Indexes" }
    ],

    HIBERNATE: [
        {
            value: "SPRING_DATA_JPA",
            label: "JPA & Hibernate"
        },
        {
            value: "TRANSACTIONS",
            label: "Transactions"
        }
    ],

    REST: [
    {
        value: "REST_API",
        label: "REST API"
    }
],

    MICROSERVICES: [
    {
        value: "MICROSERVICES",
        label: "Microservices"
    }
],

    DOCKER: [
        { value: "DOCKER", label: "Docker" }
    ],

    CAMUNDA: [
        { value: "CAMUNDA", label: "Camunda" }
    ],

    KAFKA: [
        { value: "KAFKA", label: "Kafka" }
    ]
};

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