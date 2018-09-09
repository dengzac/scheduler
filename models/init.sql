BEGIN;
\i init_tables.sql
\copy departments from 'departments.csv' DELIMITER ',' CSV

\i permissions.sql
\i roles.sql
\i role_permissions.sql

COMMIT;