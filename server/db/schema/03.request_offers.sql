DROP TABLE IF EXISTS request_offers CASCADE;
CREATE TABLE request_offers (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id) NOT NULL,
  reader_id INTEGER REFERENCES users (id) NOT NULL,
  is_accepted BOOLEAN DEFAULT false,
  is_cancelled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT current_timestamp
);
