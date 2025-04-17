CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Position (
    id SERIAL PRIMARY KEY,
    positionName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Team (
    id SERIAL PRIMARY KEY,
    creationDate TIMESTAMP,
    terminationDate TIMESTAMP,
    experience INTEGER,
    level INTEGER,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Bot (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    price INTEGER
);

CREATE TABLE IF NOT EXISTS Employee (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileEpic VARCHAR(255),
    nationality VARCHAR(255),
    experience INTEGER,
    level INTEGER,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    birthDate DATE,
    profilePicture VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    coins INTEGER DEFAULT 0,
    phoneNumber VARCHAR(20),
    position_id INTEGER REFERENCES Position(id),
    team_id INTEGER REFERENCES Team(id)
);

CREATE TABLE IF NOT EXISTS Employee_Bot (
    employee_id UUID REFERENCES Employee(id),
    bot_id INTEGER REFERENCES Bot(id),
    isEquipped BOOLEAN DEFAULT FALSE,
    purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id, bot_id)
);

CREATE TABLE IF NOT EXISTS Achievement (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Employee_Achievement (
    employee_id UUID REFERENCES Employee(id),
    achievement_id INTEGER REFERENCES Achievement(id),
    obtainedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS Badge (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Employee_Badge (
    employee_id UUID REFERENCES Employee(id),
    badge_id INTEGER REFERENCES Badge(id),
    obtainedDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id, badge_id)
);

CREATE TABLE IF NOT EXISTS Notification (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    employee_id UUID REFERENCES Employee(id)
);

CREATE TABLE IF NOT EXISTS Topic (
    id SERIAL PRIMARY KEY,
    topicName VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Problem (
    id SERIAL PRIMARY KEY,
    reward INTEGER,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    input_format TEXT NOT NULL,
    output_format TEXT NOT NULL,
    sample_input TEXT NOT NULL,
    sample_output TEXT NOT NULL,
    difficulty VARCHAR(50),
    acceptance FLOAT,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expirationDate TIMESTAMP,
    solution TEXT
);

CREATE TABLE IF NOT EXISTS Problem_Topic (
    topic_id INTEGER REFERENCES Topic(id),
    problem_id INTEGER REFERENCES Problem(id),
    PRIMARY KEY (topic_id, problem_id)
);

CREATE TABLE IF NOT EXISTS TestCase (
    id SERIAL PRIMARY KEY,
    input TEXT,
    output TEXT,
    problem_id INTEGER REFERENCES Problem(id)
);

CREATE TABLE IF NOT EXISTS Solution (
    employee_id UUID REFERENCES Employee(id),
    problem_id INTEGER REFERENCES Problem(id),
    submissionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    code TEXT,
    executionTime FLOAT,
    memory FLOAT,
    inTeam BOOLEAN,
    language VARCHAR(50),
    PRIMARY KEY (employee_id, problem_id)
);

CREATE TABLE IF NOT EXISTS Comment (
    id SERIAL PRIMARY KEY,
    description TEXT,
    messageDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    employee_id UUID REFERENCES Employee(id),
    problem_id INTEGER REFERENCES Problem(id)
);

CREATE TABLE IF NOT EXISTS Employee_Comment (
    employee_id UUID REFERENCES Employee(id),
    comment_id INTEGER REFERENCES Comment(id),
    PRIMARY KEY (employee_id, comment_id)
);

CREATE TABLE IF NOT EXISTS Product (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    price INTEGER,
    publishDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    quantity INTEGER
);

CREATE TABLE IF NOT EXISTS Employee_Product (
    employee_id UUID REFERENCES Employee(id),
    product_id INTEGER REFERENCES Product(id),
    purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id, product_id)
);

CREATE TABLE IF NOT EXISTS Task (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    taskType VARCHAR(255),
    priority VARCHAR(50),
    status VARCHAR(50),
    estimatedTime INTEGER,
    affectedModule VARCHAR(255),
    tag VARCHAR(255),
    reward INTEGER,
    employee_id UUID REFERENCES Employee(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS Suggestion (
    id SERIAL PRIMARY KEY,
    code TEXT,
    comment TEXT,
    path VARCHAR(255),
    suggestionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    employee_id UUID REFERENCES Employee(id)
);

CREATE TABLE IF NOT EXISTS Resource (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    resourceType VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Suggestion_Resource (
    suggestion_id INTEGER REFERENCES Suggestion(id),
    resource_id INTEGER REFERENCES Resource(id),
    PRIMARY KEY (suggestion_id, resource_id)
);
