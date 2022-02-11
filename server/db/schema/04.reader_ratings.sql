DROP TABLE IF EXISTS reader_ratings CASCADE;
CREATE TABLE reader_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id),
  rating INTEGER DEFAULT NULL,
  created_at timestamp default current_timestamp
);
