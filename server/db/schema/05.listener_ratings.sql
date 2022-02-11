DROP TABLE IF EXISTS listener_ratings CASCADE;
CREATE TABLE listener_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id),
  rating INTEGER DEFAULT NULL,
  created_at timestamp default current_timestamp
);
