
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='admin';

INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t2.name='view_departments' AND NOT EXISTS (SELECT 1 FROM role_permissions as r WHERE t1.id=r.role_id and t2.id=r.permission_id);
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on (t2.name LIKE '%view%') AND t1.name='view_only' AND NOT EXISTS (SELECT 1 FROM role_permissions as r WHERE t1.id=r.role_id and t2.id=r.permission_id);

INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='department_head' AND t2.name='view_teacher' AND t1.department=t2.department AND t1.department IS NOT NULL;
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='department_head' AND t2.name='edit_teacher' AND t1.department=t2.department AND t1.department IS NOT NULL;
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='department_head' AND t2.name='view_course' AND t1.department=t2.department AND t1.department IS NOT NULL;
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='department_head' AND t2.name='edit_course' AND t1.department=t2.department AND t1.department IS NOT NULL;
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='department_head' AND t2.name='view_schedule' AND t1.department=t2.department AND t1.department IS NOT NULL;
INSERT INTO role_permissions SELECT t1.id as role_id, t2.id as permission_id FROM roles t1 INNER JOIN permissions t2 on t1.name='department_head' AND t2.name='edit_schedule' AND t1.department=t2.department AND t1.department IS NOT NULL;