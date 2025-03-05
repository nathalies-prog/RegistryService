CREATE TABLE lending (
    "id" SERIAL PRIMARY KEY,
    "lend_at" date NOT NULL,
    "return_at" date NOT NULL,
    "book_isbn" text NOT NULL,
    "accountnumber" INT NOT NULL
)