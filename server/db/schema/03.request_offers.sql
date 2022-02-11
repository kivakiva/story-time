DROP TABLE IF EXISTS request_offers CASCADE;
CREATE TABLE request_offers (
  id SERIAL PRIMARY KEY NOT NULL,
  request_id INTEGER REFERENCES requests (id),
  reader_id INTEGER REFERENCES users (id) NOT NULL,
  accepted BOOLEAN DEFAULT true,
  cancelled BOOLEAN DEFAULT false,
  created_at timestamp default current_timestamp
);
