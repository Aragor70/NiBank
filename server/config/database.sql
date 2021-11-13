CREATE DATABASE nibank;


CREATE TABLE accounts(
    user_id serial PRIMARY KEY,
    name VARCHAR (250) NOT NULL,
    password VARCHAR (255) NOT NULL,
    email VARCHAR (250) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NOT NULL
);

CREATE TABLE roles(
    role_id serial PRIMARY KEY,
    role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE account_roles(
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    grant_date TIMESTAMP,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (role_id)
        REFERENCES roles (role_id),
    FOREIGN KEY (user_id)
        REFERENCES accounts (user_id)
)

CREATE TABLE transactions(
    tsx_id serial PRIMARY KEY NOT NULL,
    from_id INT NOT NULL,
    to_user_id INT,
    to_project_id INT,
    amount float8 NOT NULL CHECK (amount > 0),
    previous_hash VARCHAR(255) NOT NULL,
    current_hash VARCHAR(255) NOT NULL,
    nonce INT NOT NULL CHECK (nonce > 0),
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accounting_date TIMESTAMP,
    currency VARCHAR(50) NOT NULL,
    FOREIGN KEY (to_user_id)
        REFERENCES accounts (user_id),
    FOREIGN KEY (to_project_id)
        REFERENCES projects (project_id)
);

CREATE TABLE projects(
    project_id INT PRIMARY KEY NOT NULL,
    projectName VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    typeOfInvestment VARCHAR(50) NOT NULL,
    typeOfProperty VARCHAR(50) NOT NULL,
    project VARCHAR(50) NOT NULL,
    term INT NOT NULL CHECK (term > 0),
    yieldPA float8 NOT NULL,
    volumeTotal float8 NOT NULL CHECK (volumeTotal > 0),
    volumeInvested float8 NOT NULL,
    currency VARCHAR(50) NOT NULL,
    minimumInvestment float8 NOT NULL,
    country VARCHAR(50) NOT NULL,
    owner_id INT NOT NULL,
    
    listOfInvestors integer[],
    likes integer[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    startDate TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    closeDate TIMESTAMP NOT NULL,
    FOREIGN KEY (owner_id)
        REFERENCES accounts (user_id)
);
