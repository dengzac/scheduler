INSERT INTO permissions (name, department) SELECT 'view_teacher', id FROM departments;
INSERT INTO permissions (name, department) SELECT 'edit_teacher', id FROM departments;
INSERT INTO permissions (name, department) SELECT 'view_course', id FROM departments;
INSERT INTO permissions (name, department) SELECT 'edit_course', id FROM departments;
INSERT INTO permissions (name, department) SELECT 'view_schedule', id FROM departments;
INSERT INTO permissions (name, department) SELECT 'edit_schedule', id FROM departments;

INSERT INTO permissions (name) SELECT 'view_permissions';
INSERT INTO permissions (name) SELECT 'edit_permissions';
INSERT INTO permissions (name) SELECT 'view_departments';
INSERT INTO permissions (name) SELECT 'edit_departments';
