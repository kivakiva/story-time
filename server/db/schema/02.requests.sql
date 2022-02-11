DROP TABLE IF EXISTS requests CASCADE;
CREATE TABLE requests (
  id SERIAL PRIMARY KEY NOT NULL,
  request_text TEXT DEFAULT NULL,
  book_title VARCHAR(255) NOT NULL,
  online BOOLEAN NOT NULL DEFAULT true,
  in_person BOOLEAN NOT NULL DEFAULT false,
  listener_id INTEGER REFERENCES users (id) NOT NULL,
  reader_id INTEGER REFERENCES users (id) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  accepted_at TIMESTAMP DEFAULT NULL,
  completed_at TIMESTAMP DEFAULT NULL,
  cancelled_at TIMESTAMP DEFAULT NULL,
  who_cancelled_id INTEGER REFERENCES users (id) DEFAULT NULL
);
