BEGIN;

INSERT INTO "user" (fname, lname, email, password) VALUES ('joey', 'test', 'joey@email.com', '$2a$10$Oq28REehpjjNt4u5fzWmqOZOC4VKCxrGa0AkRr.dTMhcYMNC8MPFS');

-- INSERT INTO "server" (server_name, server_url, user_id) VALUES ('test server', 'http://localhost:4000', 1);

COMMIT;
