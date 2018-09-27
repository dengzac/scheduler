BEGIN;
\i init_tables.sql
\copy departments from 'departments.csv' DELIMITER ',' CSV

\i permissions.sql
\i roles.sql
\i role_permissions.sql
INSERT INTO users(email) VALUES ('zadeng@s.sfusd.edu');
INSERT INTO users(email) VALUES ('hoffmank@sfusd.edu');
INSERT INTO user_role(user_id, role_id) SELECT users.id, roles.id FROM users JOIN roles ON roles.name='admin' WHERE users.email='zadeng@s.sfusd.edu';
INSERT INTO user_role(user_id, role_id) SELECT users.id, roles.id FROM users JOIN roles ON roles.name='admin' WHERE users.email='hoffmank@sfusd.edu';
COMMIT;