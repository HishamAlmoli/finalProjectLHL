INSERT INTO parents (parent_name, email, phone, password)
VALUES ('John Doe', 'johndoe@gmail.com', '(111)111-1111', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO activities (activity_name, description, out_of_daycare)
VALUES ('eating', 'eating time', FALSE), 
('painting', 'painting time', FALSE),
('drawing', 'drawing time', FALSE),
('play', 'play time', FALSE),
('nap', 'nap time', FALSE),
('zoo', 'trip to the zoo', TRUE);


INSERT INTO employees (employee_name, phone, password)
VALUES ('John Smith','(111)111-1112', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO schedules (activity_id, date_time)
VALUES (1, '2023-02-06 9:00:00'),
(5, '2023-02-06 10:00:00'),
(4, '2023-02-06 11:00:00'),
(3, '2023-02-06 12:00:00'),
(2, '2023-02-06 13:00:00'),
(1, '2023-02-06 14:00:00');


INSERT INTO children (age_group, parent_id, child_name, notes, birthday)
VALUES ('toddler', 1, 'tim', 'tiny', '2019-02-06');

INSERT INTO employees_children(employee_id, child_id)
VALUES (1, 1);

INSERT INTO schedules_children(schedule_id, child_id)
VALUES (1, 1),
(2,1),
(3,1);