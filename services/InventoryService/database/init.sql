CREATE TABLE book(
    "id" SERIAL PRIMARY KEY,
    "isbn" text NOT NULL,
    "genre" text NOT NULL,
    "title" text NOT NULL,
    "author" text NOT NULL
);