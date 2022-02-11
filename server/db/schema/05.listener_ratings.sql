DROP TABLE IF EXISTS listener_ratings CASCADE;
CREATE TABLE listener_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id) NOT NULL,
  rating INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);
