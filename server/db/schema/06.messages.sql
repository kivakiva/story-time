DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message_text TEXT DEFAULT NULL,
  sender_id INTEGER REFERENCES users (id),
  recipient_id INTEGER REFERENCES users (id),
  created_at timestamp default current_timestamp
);
