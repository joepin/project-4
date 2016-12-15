BEGIN;

INSERT INTO "user" (fname, lname, email, password) VALUES ('joey', 'test', 'joey@email.com', '$2a$10$Oq28REehpjjNt4u5fzWmqOZOC4VKCxrGa0AkRr.dTMhcYMNC8MPFS');

INSERT INTO "server" (server_name, server_mac, server_uuid, user_id) VALUES ('Media Server 1', '010203040506', '00010002-0003-4004-8005-000601000000', 1000);
INSERT INTO "server" (server_name, server_mac, server_uuid, user_id) VALUES ('Media Server 2', '102030405060', '01000200-0300-4400-8500-060001000000', 1000);

INSERT INTO "server_uuid_url" (server_uuid, server_url) VALUES ('00010002-0003-4004-8005-000601000000', 'http://localhost:5000');
INSERT INTO "server_uuid_url" (server_uuid, server_url) VALUES ('01000200-0300-4400-8500-060001000000', 'http://localhost:6100');

COMMIT;
