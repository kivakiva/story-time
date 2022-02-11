DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  image_url TEXT DEFAULT NULL,
  password_digest VARCHAR(255) NOT NULL,
  online BOOLEAN NOT NULL DEFAULT true,
  in_person BOOLEAN NOT NULL DEFAULT false,
  created_at timestamp default current_timestamp
);
