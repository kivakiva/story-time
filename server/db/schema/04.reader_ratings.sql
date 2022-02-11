DROP TABLE IF EXISTS reader_ratings CASCADE;
CREATE TABLE reader_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id) NOT NULL,
  rating INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);
