DROP TABLE IF EXISTS request_offers CASCADE;
CREATE TABLE request_offers (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id) NOT NULL,
  reader_id INTEGER REFERENCES users (id) NOT NULL,
  offer_text TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);
