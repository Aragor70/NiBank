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
)
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