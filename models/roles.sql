INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name, department) SELECT 'department_head', id FROM departments;
INSERT INTO roles (name) VALUES ('view_only');