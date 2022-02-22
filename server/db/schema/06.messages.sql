DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  message_text TEXT NOT NULL,
  sender_id INTEGER REFERENCES users (id) NOT NULL,
  recipient_id INTEGER REFERENCES users (id) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp,
  customization VARCHAR(255) DEFAULT NULL
);
